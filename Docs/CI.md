# Continuous Integration (`jekyll.yml`)

`.github/workflows/jekyll.yml` runs on every push to `main`, every pull request targeting `main`, and manual `workflow_dispatch`.

## Verification Gates in the `build` Job

The `build` job runs on `ubuntu-latest` with Ruby `3.4` and executes the following mandatory gates in order:

1. **Site Preflight (`npm run preflight`)** — validates `robots.txt`, blocks accidental `noindex`/`nofollow`/redirect directives, verifies 4-locale parity (`en`, `uk`, `ru`, `ko`), shared permalinks, and game/tool media assets.
2. **Ruby Dependency Security Audit (`bundle exec bundle-audit check --update`)** — checks `Gemfile.lock` against known RubyGems advisories.
3. **Production Jekyll Build (`npm run build`)** — builds the site into `./_site` with `JEKYLL_ENV=production` and UTF-8 encoding enforced.
4. **HTML Proofer (`npm run verify:html`)** — validates internal links, hashes, images, and scripts across all 56 generated HTML pages (ignoring `/^\/wearview\//`, which is deployed as a sibling repository under `wristandpocket.dev`).
5. **JavaScript Size Budget (`npm run verify:js`)** — enforces the 20 KB ceiling on `_site/assets/js/script.js`.
6. **Generated-Site Quality Gate (`npm run verify:quality`)** — verifies `html[lang]`, `<main>` and `<nav>` landmarks, single `<h1>`, sequential heading hierarchy, `img[alt]` attributes, and accessible link/button names.
7. **Source & Generated Claim Guard (`npm run verify:source-claims` & `npm run test:source-claims`)** — prevents unconfirmed product performance claims, unverified OS/device support matrices, and unverified store/test URLs, then runs negative regression tests to prove the guard rejects unsafe inputs.
8. **320px Mobile Browser Contracts (`npm run verify:browser-320`)** — launches headless Chrome via raw DevTools Protocol at `320x568` across `/`, `/uk/games/`, `/games/cyberpunk-3d/`, `/tools/wearview/`, `/blog/`, and `/404.html` to verify HTTP status, zero horizontal overflow (`scrollWidth <= 320`), single `<h1>`, loaded images, active navigation (`aria-current="page"`), and 44×44px minimum navigation targets.
9. **Route, Metadata & Publication Boundary Audit (`npm run verify:routes` & `npm run test:audit`)** — parses all 56 generated HTML files and `sitemap.xml` with Nokogiri to verify unique localized titles/descriptions, canonical URLs, 5-link reciprocal `hreflang` sets, JSON-LD validity and URL identity, internal link/anchor resolution, preservation of all 52 published routes in `scripts/public_routes.json`, and zero leakage of operational directories or source files, followed by mutation tests against a disposable build copy.
10. **CI Verification Report (`scripts/ci/write-site-ci-report.ps1`)** — writes `ci-results/site-deployment-verification.md` and uploads it as a build artifact.

## Deployment Boundaries

- Pull requests run all verification gates and upload only the verification report; the Pages artifact upload and `deploy` job are skipped on pull requests.
- Pushes to `main` and manual workflow dispatches upload `./_site` and deploy to the `github-pages` environment only if every build and verification step succeeds.
- The workflow uses read-only `contents: read` permissions for source inspection; `pages: write` and `id-token: write` exist only on the `deploy` job.
