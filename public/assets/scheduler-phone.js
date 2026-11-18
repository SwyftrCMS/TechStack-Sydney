const phone = document.querySelector('[data-scheduler-phone]');

if (phone) {
  const viewport = phone.querySelector('.scheduler-viewport');
  const placeholder = phone.querySelector('.scheduler-placeholder');
  const message = phone.querySelector('.scheduler-message');
  let frame;
  let timeout;
  let ready = false;

  function mount() {
    clearTimeout(timeout);
    frame?.remove();
    ready = false;
    message.hidden = true;
    frame = document.createElement('iframe');
    frame.title = 'Interactive job scheduler demo';
    frame.inert = true;
    frame.setAttribute('aria-hidden', 'true');
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
    frame.src = '/scheduler-demo/index.html';
    viewport.append(frame);
    timeout = setTimeout(() => {
      message.hidden = false;
    }, 15000);
  }

  window.addEventListener('message', event => {
    if (ready || !frame || event.source !== frame.contentWindow ||
        event.origin !== location.origin || event.data?.type !== 'scheduler-demo-ready') return;
    ready = true;
    clearTimeout(timeout);
    message.hidden = true;
    frame.inert = false;
    frame.removeAttribute('aria-hidden');
    frame.classList.add('is-ready');
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => { placeholder.hidden = true; }, reduceMotion ? 0 : 260);
  });

  message.querySelector('button').addEventListener('click', mount);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      mount();
    }, { rootMargin: '450px' });
    observer.observe(phone);
  } else if (document.readyState === 'complete') {
    mount();
  } else {
    window.addEventListener('load', mount, { once: true });
  }
}
