# Wrist & Pocket Studio — Official Website (`wristandpocket.dev`)

> **Owner:** Ihor Sivochka (Figarist) · **Email:** wristandpocket.studio@gmail.com  
> **Live:** https://wristandpocket.dev · **Repo:** https://github.com/wristandpocket/wristandpocket.github.io

---

## Architecture & Tech Stack

This repository is the public website for **Wrist & Pocket Studio**, built with **Jekyll 4.3** (Ruby 3.4) and deployed automatically via **GitHub Actions** to `wristandpocket.dev`. It is a static, quadrilingual website supporting **English (`en`), Ukrainian (`uk`), Russian (`ru`), and Korean (`ko`)** with strict 4-locale structural and content parity.

### Core Plugins & Metadata Architecture
*   **jekyll-polyglot (`= 1.14.0`)** — Generates localized routes (`/` for `en`, `/uk/`, `/ru/`, `/ko/`) from shared permalinks.
*   **Custom Head & JSON-LD (`_includes/head.html`, `_includes/metadata/json-ld.html`)** — Emits deterministic canonical URLs, 5-link reciprocal `hreflang` sets (`en`, `uk`, `ru`, `ko`, `x-default`), Open Graph / X Cards, and localized Schema.org JSON-LD (`Organization`, `WebSite`, `CollectionPage`, `CreativeWork`, `SoftwareApplication`, `FAQPage`, `BlogPosting`, `BreadcrumbList`).
*   **jekyll-spaceship** — Processes tables, media, MathJax, and Mermaid diagrams in Markdown content.
*   **jekyll-minifier** — Minifies generated HTML, CSS, and JS in production builds.
*   **jekyll-feed & jekyll-last-modified-at** — Generates localized Atom feeds and `lastmod` timestamps for `sitemap.xml`.
*   **Retirement Service Worker (`sw.js`)** — Cleans up legacy Workbox caches for returning visitors without installing an offline HTML cache (`service-worker.js` is excluded from `_site`).

---

## File Structure

```text
/
├── .frontmatter/       ← Front Matter CMS scripts (preflight, build, HTMLProofer, JS budget, quality, scaffolds)
├── .github/workflows/  ← CI/CD pipeline (jekyll.yml: 10 verification gates + GitHub Pages deploy)
├── Docs/               ← CI and site audit documentation (excluded from _site)
├── _data/              ← Localization dictionaries and shared structured copy
│   ├── en/strings.yml  ← English UI strings (default locale)
│   ├── uk/strings.yml  ← Ukrainian UI strings
│   ├── ru/strings.yml  ← Russian UI strings
│   ├── ko/strings.yml  ← Korean UI strings
│   ├── site_copy.json  ← Quadrilingual copy for homepage, catalogue, contact, 404, gallery, and WearView card
│   ├── tag_labels.json ← Quadrilingual topic tag labels for blog cards and filters
│   ├── locale_codes.json
│   └── language_names.json
├── _includes/          ← Reusable Liquid partials (head, header, footer, game-card, metadata/json-ld)
├── _layouts/           ← Page layouts (default, post, game, tool)
├── _plugins/           ← Ruby compatibility patches (polyglot_frozen_string_patch.rb)
├── _posts/             ← Developer log posts (4 localized files per post)
├── _sass/              ← Modular SCSS partials (_variables, _fonts, _base, _layout, _cards, _post, _game, _studio)
├── assets/
│   ├── fonts/          ← Self-hosted Outfit & Fira Code WOFF2 fonts
│   ├── images/         ← WebP/SVG project media, WearView screenshots, and approved PNG UI/PWA icons
│   └── js/script.js    ← Vanilla JS (< 20 KB budget: language storage, topic filter, native <dialog> lightbox)
├── blog/
│   └── index.html      ← Developer log index with client-side topic filtering
├── games/
│   ├── index.html      ← Wear OS games catalogue (/games/)
│   ├── cyberpunk-3d-*.md
│   └── feed-me-loser-*.md
├── tools/
│   └── wearview-*.md   ← WearView 3D watch screen preview landing pages (/tools/wearview/)
├── scripts/            ← Route audit (audit_site.rb), source-claim guard (verify_source_claims.js), 320px CDP check
├── contact.html        ← Contact & support page (/contact/)
├── 404.html            ← Custom 404 page (/404.html, noindex, excluded from sitemap)
├── index.html          ← Studio homepage (Hero showcase, Featured games, News, WearView tool card, Philosophy, Connect)
├── privacy-*.md        ← Quadrilingual Privacy Policy (/privacy/, aligned with studio consent baseline)
├── styles.scss         ← Master SCSS entry point (compiles to /styles.css)
├── sitemap.xml         ← Quadrilingual XML sitemap with reciprocal xhtml:link hreflang alternates (52 routes)
└── robots.txt          ← Crawler directives pointing to https://wristandpocket.dev/sitemap.xml
```

---

## Multilingual Sync (`en` · `uk` · `ru` · `ko`)

### The Golden Rule
**One permalink. Four files. All in sync.**  
English (`en`) is the default source language. Every localized post, game page, tool page, or policy page must exist in all 4 languages with the **exact same `permalink`** (without `/uk`, `/ru`, or `/ko` prefixes) and matching `page_id`.

*   **Posts (`_posts/`)**: `YYYY-MM-DD-slug-{en,uk,ru,ko}.md` (`page_id: "<slug>"`, `permalink: "/blog/<slug>/"`)
*   **Games (`games/`)**: `<slug>-{en,uk,ru,ko}.md` (`page_id: "game-<slug>"`, `permalink: "/games/<slug>/"`)
*   **Tools (`tools/`)**: `<slug>-{en,uk,ru,ko}.md` (`page_id: "tool-<slug>"`, `permalink: "/tools/<slug>/"`)
*   **Policies (`privacy-*.md`)**: `privacy-{en,uk,ru,ko}.md` (`page_id: "page-privacy"`, `permalink: "/privacy/"`)

---

## Design System & Accessibility

*   **Surface Palette (`_sass/_studio.scss`)**: Calm dark surfaces (`#0c1016` background, `#151d28` opaque cards, `#111923` sections) with `#72e0d6` cyan and `#c49bfc` purple accents for high text contrast and zero text-over-bright-screenshot legibility issues.
*   **Typography**: Self-hosted `Outfit` for headings/prose and `Fira Code` for technical badges and metadata; Korean uses `word-break: keep-all`.
*   **Interactive Accessibility**:
    *   44×44 px minimum touch targets across navigation, language switchers, topic filters, and gallery controls.
    *   Native `<dialog id="media-dialog">` lightbox on game and tool pages with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), backdrop click-to-close, and focus restoration.
    *   Client-side topic filtering on `/blog/` via `aria-pressed` toggle buttons.

---

## Local Verification & CI/CD

Builds and deployments run via [.github/workflows/jekyll.yml](.github/workflows/jekyll.yml) on every push and pull request to `main`.

### Verification Commands (macOS / Linux / Windows)

On macOS/Linux use `npm run <script>`; on Windows PowerShell use `npm.cmd run <script>`:

| Command | Purpose |
| --- | --- |
| `npm run preflight` | Static guard for `robots.txt`, SEO directives, 4-locale `page_id`/`permalink` parity, and game/tool media assets |
| `npm run build` | Production Jekyll build (`JEKYLL_ENV=production`) into `_site/` with UTF-8 encoding enforced |
| `npm run verify:source-claims` | Regression guard preventing unverified FPS/battery results, OS minimums, or store listing claims |
| `npm run test:source-claims` | Negative unit tests proving `verify_source_claims.js` rejects unsafe claims |
| `npm run verify:browser-320` | Headless Chrome/Edge/Brave DevTools check at `320x568` across key routes (overflow, H1, images, 44×44 nav targets) |
| `npm run verify:html` | HTMLProofer check on `./_site` (ignores `/^\/wearview\//`, which is deployed from a separate repository) |
| `npm run verify:js` | Verifies `_site/assets/js/script.js` stays under the 20 KB budget (currently ~1.9 KB) |
| `npm run verify:quality` | Deterministic DOM accessibility gate (landmarks, single H1, heading hierarchy, `img[alt]`, accessible names) |
| `npm run verify:routes` | Nokogiri audit of all 56 HTML pages (52 indexable routes + 4 localized `404.html`), canonicals, 5-link `hreflang`, JSON-LD, anchors, and `public_routes.json` |
| `npm run test:audit` | Mutation test suite proving `audit_site.rb` catches broken assets, anchors, canonicals, sitemaps, and file leaks |
| `npm run verify` | Runs the complete 10-step verification pipeline end-to-end |
| `npm run check:images` | Checks `assets/images/` for WebP/SVG compliance and approved PNG icon exceptions |

See [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md), [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md), [LOCAL_JEKYLL_SETUP.md](LOCAL_JEKYLL_SETUP.md), and [Docs/CI.md](Docs/CI.md) for detailed guides.
