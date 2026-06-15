# Site Audit Roadmap

Created: 2026-06-15

This roadmap tracks the staged improvement plan for the Wrist & Pocket Studio website. The goal is to improve trust, search/social previews, tester conversion, and mobile performance without turning the site into a generic landing page.

## Search Console Guardrails

- Preserve existing indexed URLs unless a redirect plan is written first.
- Do not add `noindex`, broad `nofollow`, or restrictive `robots.txt` rules without an explicit release reason.
- Keep canonical URLs and hreflang alternates aligned for every localized page.
- Keep sitemap changes conservative and validate the generated XML before deployment.
- Prefer metadata improvements over URL changes for SEO iteration.
- After deployment, inspect Google Search Console for indexing, canonical, sitemap, and enhancement warnings before starting the next SEO stage.

## Stage 1 - Current Session

Priority: P0/P1

- Tighten site-level SEO titles and descriptions.
- Use game-specific social preview images instead of the generic studio card.
- Add a clear beta tester CTA on the homepage and game detail pages.
- Replace fragile localized status matching with an explicit front matter flag for tester CTAs.
- Refresh dated announcement copy so posts do not say "tomorrow" after the announcement date has passed.
- Run available static checks and document any blocked verification.

## Stage 2 - Next Pass

Priority: P1

- Compress oversized PWA icons and review WebP/WebM export settings.
- Decide whether the site really needs offline/PWA behavior; if yes, vendor Workbox locally instead of importing it from a CDN.
- Run visual QA in a browser across desktop, mobile, and narrow mobile widths.
- Check keyboard focus, lightbox focus trapping, and reduced-motion behavior.
- Add a dedicated social card per game if the current banners do not crop well in link previews.

## Stage 3 - Content And Conversion

Priority: P2

- Tune homepage and game copy so the premium positioning stays confident while keeping the studio voice.
- Add a compact "tested on real watches" proof section once device coverage is ready to publish.
- Add Play Store links and store badges only after the listings are public.
- Review privacy pages against the shipped telemetry behavior for each game before release.
- Add a lightweight changelog or "latest build notes" block for active testers.

## Stage 4 - Operational Polish

Priority: P3

- Add an automated link checker in GitHub Actions.
- Add a metadata snapshot check for canonical, hreflang, Open Graph, and sitemap output.
- Add image budget checks for new media.
- Consider a custom domain when the studio is ready for public-facing launch materials.
