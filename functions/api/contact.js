const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff'
};

function reply(status, data) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function configured(env) {
  return Boolean(env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET &&
    env.CONTACT_WEBHOOK_URL && env.CONTACT_WEBHOOK_TOKEN);
}

export function onRequestGet({ env }) {
  return configured(env)
    ? reply(200, { siteKey: env.TURNSTILE_SITE_KEY })
    : reply(503, { error: 'Online submissions are currently unavailable.' });
}

export async function onRequestPost({ request, env }) {
  const unavailable = () => reply(503, { error: 'Online submissions are currently unavailable.' });
  if (!configured(env)) return unavailable();

  const hostname = new URL(request.url).hostname;
  if (request.headers.get('Origin') !== new URL(request.url).origin) {
    return reply(403, { error: 'Submit this form from the contact page.' });
  }
  if (!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded')) {
    return reply(415, { error: 'Unsupported form format.' });
  }
  if (!request.body) return reply(400, { error: 'Missing enquiry.' });

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let body = '';
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 24000) {
      await reader.cancel();
      return reply(413, { error: 'Your enquiry is too long.' });
    }
    body += decoder.decode(value, { stream: true });
  }
  const form = new URLSearchParams(body + decoder.decode());
  const type = form.get('type');
  const name = form.get('name')?.trim();
  const email = form.get('email')?.trim();
  const message = form.get('message')?.trim();
  const token = form.get('token');

  if (!['project', 'demo'].includes(type) || !name || name.length > 100 ||
    !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message || message.length > 2000) {
    return reply(400, { error: 'Check the enquiry type, name, email and message.' });
  }
  if (!token || token.length > 2048) {
    return reply(400, { error: 'Complete the security check and try again.' });
  }

  try {
    const verified = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token }),
      signal: AbortSignal.timeout(8000)
    });
    if (!verified.ok) return unavailable();
    const challenge = await verified.json();
    if (!challenge.success || challenge.hostname !== hostname || challenge.action !== 'enquiry') {
      return reply(400, { error: 'The security check expired or failed. Please retry.' });
    }

    const destination = new URL(env.CONTACT_WEBHOOK_URL);
    if (destination.protocol !== 'https:' || destination.username || destination.password) {
      return unavailable();
    }
    const delivered = await fetch(destination, {
      method: 'POST',
      redirect: 'error',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + env.CONTACT_WEBHOOK_TOKEN
      },
      body: JSON.stringify({ type, name, email, message }),
      signal: AbortSignal.timeout(8000)
    });
    return delivered.ok ? reply(200, { ok: true }) : unavailable();
  } catch {
    return unavailable();
  }
}
