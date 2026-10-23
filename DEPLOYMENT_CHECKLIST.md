# Deployment Checklist

Use this checklist before pushing changes to `main`, especially while the site is tracked in Google Search Console.

## Before Editing

- Decide whether the change affects content, layout, metadata, URLs, sitemap, robots, or service worker behavior.
- If URLs, canonical tags, `hreflang`, sitemap, or robots rules are involved, write the expected indexing effect before changing code.
- Do not change `permalink` values unless a redirect and Search Console follow-up plan exists.
- If adding a new public page or blog post, add its 4 localized routes (`en`, `uk`, `ru`, `ko`) to `scripts/public_routes.json`.

## Local Verification Pipeline

Run the static preflight guardrail first:

```bash
# macOS / Linux
npm run preflight

# Windows PowerShell
npm.cmd run preflight
```

This checks:

- no accidental `noindex`, broad `nofollow`, or whole-site `Disallow`;
- stable permalinks compared with `HEAD`;
- required 4-locale variants (`en`, `uk`, `ru`, `ko`) and shared permalinks for posts, games, tools, and privacy policies;
- game and tool social images and gallery media assets;
- baseline canonical, `hreflang`, and sitemap template guards.

Only use the escape hatch for intentional URL work with a documented redirect plan:

```bash
node .frontmatter/scripts/site-preflight.js --allow-url-change
```

Run the full verification suite before pushing:

```bash
# macOS / Linux
npm run verify

# Windows PowerShell
npm.cmd run verify
```

`npm run verify` executes all 10 gates used in CI:

1. `npm run preflight` — static front matter, locale, URL, and asset checks.
2. `npm run build` — production Jekyll build into `_site/`.
3. `npm run verify:source-claims` — ensures no unconfirmed FPS/battery results, OS minimums, or store URLs are claimed for studio games.
4. `npm run test:source-claims` — negative regression tests for the source-claim guard.
5. `npm run verify:browser-320` — headless Chrome/Edge/Brave DevTools check at `320x568` across `/`, `/uk/games/`, `/games/cyberpunk-3d/`, `/tools/wearview/`, `/blog/`, and `/404.html`.
6. `npm run verify:html` — HTMLProofer link, image, and script verification across `_site/` (on Windows, if local `libcurl` is unavailable, rely on macOS or Linux GitHub Actions).
7. `npm run verify:js` — checks that `_site/assets/js/script.js` stays under the 20 KB budget.
8. `npm run verify:quality` — checks HTML `lang`, landmarks (`<main>`, `<nav>`), single `<h1>`, heading hierarchy, `img[alt]`, and accessible link/button names.
9. `npm run verify:routes` — Nokogiri audit of all 56 generated HTML pages (52 indexable routes + 4 localized `404.html`), canonicals, 5-link `hreflang` sets, JSON-LD identity, internal anchors, `sitemap.xml`, `robots.txt`, and `scripts/public_routes.json`.
10. `npm run test:audit` — mutation tests proving `audit_site.rb` rejects broken assets, anchors, canonicals, sitemaps, removed routes, and leaked operational files.

## Push And Deploy

- Push to `main` only after local verification passes.
- Confirm the GitHub Actions `Deploy Jekyll with Polyglot` workflow (`jekyll.yml`) succeeds.
- The production artifact must not publish local workflow files (`Docs/`, `scripts/`, `qa-evidence/`, `ci-results/`, `.agents/`, `.frontmatter/`, `frontmatter.json`, `package.json`, `README.md`, `GEMINI.md`, `CONTENT_WORKFLOW.md`, `DEPLOYMENT_CHECKLIST.md`, `LOCAL_JEKYLL_SETUP.md`).
- Spot-check key routes after deployment:
  - `/`
  - `/games/`
  - `/games/cyberpunk-3d/`
  - `/games/feed-me-loser/`
  - `/tools/wearview/`
  - `/blog/`
  - `/blog/stop-trusting-wear-os-screenshots/`
  - `/contact/`
  - `/privacy/`
  - `/uk/`, `/ru/`, `/ko/`
  - `/sitemap.xml`
  - `/robots.txt`

## Custom Domain And HTTPS

The production domain is `wristandpocket.dev`.

Expected apex `A` records (GitHub Pages):

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

The `www` `CNAME` record should point to:

```text
wristandpocket.github.io
```

Expected HTTP behavior:

```bash
curl -I https://wristandpocket.dev/
curl -I http://wristandpocket.dev/
curl -I http://wristandpocket.dev/games/
curl -I https://www.wristandpocket.dev/
```

- `https://wristandpocket.dev/` returns `200`.
- `http://wristandpocket.dev/` returns `301` to `https://wristandpocket.dev/`.
- `http://wristandpocket.dev/games/` returns `301` to the HTTPS URL.
- `https://www.wristandpocket.dev/` returns `301` to `https://wristandpocket.dev/`.

## Sitemap Checks

Production sitemap URL:

```text
https://wristandpocket.dev/sitemap.xml
```

Basic local sanity check after `npm run build`:

```bash
node -e "const fs=require('fs'); const s=fs.readFileSync('_site/sitemap.xml','utf8'); const loc=[...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]); console.log({locCount:loc.length, uniqueCount:new Set(loc).size, hasGithubIo:loc.some(x=>x.includes('github.io'))});"
```

Expected snapshot as of 2026-10-23 (13 indexable routes × 4 locales = 52 URLs; 4 localized `404.html` pages are excluded):

```text
locCount: 52
uniqueCount: 52
hasGithubIo: false
```

## Search Console Follow-Up

After deployment:

- Check indexing status for the changed pages.
- Inspect canonical URL selection for key pages.
- Check sitemap processing status.
- Watch for new mobile usability, rich result, or page indexing warnings.
- If traffic changes sharply, compare the deployment date with Search Console impressions/clicks before making another SEO change.

## Rollback Trigger

Prepare to revert or hotfix if:

- pages return 404 or redirect unexpectedly;
- `robots.txt` blocks crawling;
- localized pages lose `hreflang` alternates;
- canonical URLs point to the wrong language or path;
- GitHub Actions deploys a broken `_site`;
- Search Console reports new critical indexing errors after the deployment.
