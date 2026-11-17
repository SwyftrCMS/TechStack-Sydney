# App video demo

Maintained copy of [SwyftrCMS/TSS-APP-VIDEO](https://github.com/SwyftrCMS/TSS-APP-VIDEO), pinned to source commit `c37b8678635f28aadc472c2bd44eb04d3b90dcd5`.

This copy is built independently and deployed with the TechStack Sydney site at `/app-video-demo/`. It uses the site's self-hosted Plus Jakarta Sans and JetBrains Mono fonts. The animation source is React; the generated `dist` output is copied to `public/app-video-demo/` for the static site deployment.

To rebuild, run `npm ci` here, then `npm run build`. Copy the contents of `dist/` to the website's `public/app-video-demo/` directory. Keep the source and generated output in the same site change.
