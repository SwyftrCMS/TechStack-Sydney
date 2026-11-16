# TechStack Sydney

Static HTML, CSS and JavaScript in `public/`. Run `python -m http.server 8000 --directory public` for a local preview. Python's server uses literal filenames, so open `/services.html`, `/gym-app.html` and `/contact.html` directly there. Cloudflare Pages serves extensionless URLs and the custom 404.

## Cloudflare Pages

Use the existing `techstack-sydney` project. Production branch `main`, framework preset None, root directory unset, build command blank, output directory `public`. Enable preview builds for the review branch. The reported prior setup used `exit 0` with `public` and `main`. Confirm the current settings and record the deployment ID from the dashboard before release. The repository baseline for this conversion is `e85f160695fb9682e3624a2c50b0032665542c34`. To roll back, select the prior successful production deployment under Deployments and revert the release in GitHub.

## Enquiries

Forms stay disabled until the Pages environment is configured. Create a Turnstile widget for the deployment host, then set `TURNSTILE_SITE_KEY` as a variable and `TURNSTILE_SECRET`, `CONTACT_WEBHOOK_URL` and `CONTACT_WEBHOOK_TOKEN` as secrets under Settings → Variables and Secrets. The HTTPS receiver must accept bearer-authenticated JSON containing `type`, `name`, `email` and `message`, deliver the enquiry, and respond with 2xx on success. Use a separate test receiver and widget for previews. Redeploy after configuring variables. Plain Python preview only serves static files.

Client logos and example reviews are wireframe content. Confirm the real claims, reviews and brand assets before launch. Configure the `www` redirect and production `pages.dev` redirect at the Cloudflare edge if needed. Preview deployments should remain accessible for review.
