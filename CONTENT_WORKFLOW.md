# Wrist & Pocket Site Content Workflow

This document is the operating guide for creating, updating, and verifying content in the Wrist & Pocket Studio Jekyll site (`web/studio-site`).

## Core Model

- The site is a standalone public Git repository (`wristandpocket/wristandpocket.github.io`) tracked from the private studio workspace as the `web/studio-site` Git submodule.
- Commit and push site changes inside `web/studio-site` first.
- Then commit and push the updated `web/studio-site` submodule pointer in the root studio workspace.
- English is the source language for files, docs, code comments, commit messages, and public site copy. Every public route must maintain strict 4-locale parity (`en`, `uk`, `ru`, `ko`).
- Never copy private SDK code, internal studio roadmaps, commercial license keys, or unconfirmed product claims into this public repository.

## Local Command Notes (macOS & Windows)

- On **macOS / Linux**, use `npm run <script>`.
- On **Windows PowerShell**, use `npm.cmd run <script>` if execution policy blocks `npm.ps1`.

Common commands:

```bash
# macOS / Linux
npm run preflight
npm run build
npm run verify
npm run check:images

# Windows PowerShell
npm.cmd run preflight
npm.cmd run build
npm.cmd run verify
npm.cmd run check:images
```

`npm run verify` (and `npm run verify:ci`) runs the full 10-step verification pipeline:

1. `npm run preflight` — front matter, 4-locale groups, permalink stability, and game/tool media asset checks.
2. `npm run build` — production Jekyll build (`JEKYLL_ENV=production`) with UTF-8 encoding enforced.
3. `npm run verify:source-claims` — regression guard scanning 65 source files and 56 generated HTML pages for unconfirmed performance, OS minimum, or store claims.
4. `npm run test:source-claims` — negative tests proving the claim guard catches unsafe claims.
5. `npm run verify:browser-320` — headless Chrome/Edge/Brave DevTools check at `320x568` across `/`, `/uk/games/`, `/games/cyberpunk-3d/`, `/tools/wearview/`, `/blog/`, and `/404.html`.
6. `npm run verify:html` — HTMLProofer link, image, and script verification across all 56 generated HTML files (ignoring `/^\/wearview\//`, which is deployed from a separate repository).
7. `npm run verify:js` — verifies `_site/assets/js/script.js` remains within the 20 KB budget.
8. `npm run verify:quality` — generated HTML landmark, single-H1, heading order, `img[alt]`, and accessible link/button name gate.
9. `npm run verify:routes` — Nokogiri route, canonical, 5-link `hreflang`, JSON-LD, internal anchor, sitemap (52 indexable URLs), and `scripts/public_routes.json` audit.
10. `npm run test:audit` — mutation tests against a temporary copy of `_site` proving `audit_site.rb` rejects broken output.

> **Note on Windows HTMLProofer:** On Windows, `npm.cmd run verify:html` may fail locally if RubyInstaller/MSYS2 cannot load `libcurl.dll` (error 126). On macOS and in Linux GitHub Actions, `npm run verify:html` runs natively.

## Creating A New Blog Post

Use the scaffold command:

```bash
npm run new:post -- --slug cyberpunk-devlog --title "Cyberpunk Devlog" --date 2026-10-23 --tag "Cyberpunk 3D"
```

This creates four synchronized files:

- `_posts/YYYY-MM-DD-cyberpunk-devlog-en.md`
- `_posts/YYYY-MM-DD-cyberpunk-devlog-uk.md`
- `_posts/YYYY-MM-DD-cyberpunk-devlog-ru.md`
- `_posts/YYYY-MM-DD-cyberpunk-devlog-ko.md`

Each file shares one `page_id` and one `permalink`:

```yaml
page_id: "cyberpunk-devlog"
permalink: "/blog/cyberpunk-devlog/"
```

- Do not manually add `/uk`, `/ru`, or `/ko` to `permalink`. Jekyll Polyglot adds language prefixes when rendering localized URLs.
- For current studio/tool posts (such as the WearView post), set `archive_note: false` in front matter if the dated-devlog archive banner should be omitted.
- When adding a new topic tag, add its localized display names to `_data/tag_labels.json` across `en`, `uk`, `ru`, and `ko`.
- After publishing a new route, add its 4 localized paths to `scripts/public_routes.json` to protect the URL against future regressions.

## Creating A New Static Page

Use the scaffold command:

```bash
npm run new:page -- --slug press-kit --title "Press Kit"
```

This creates:

- `press-kit-en.md`
- `press-kit-uk.md`
- `press-kit-ru.md`
- `press-kit-ko.md`

Static localized pages use:

```yaml
page_id: "page-press-kit"
permalink: "/press-kit/"
```

Alternatively, single-template pages like `contact.html` and `404.html` can use `copy_metadata: true` with `title_key` and `description_key` referencing `_data/site_copy.json`.

## Creating A New Game Page

Use the scaffold command:

```bash
npm run new:game -- --slug neon-runner --title "Neon Runner" --badge "Prototype" --order 3
```

This creates:

- `games/neon-runner-en.md`
- `games/neon-runner-uk.md`
- `games/neon-runner-ru.md`
- `games/neon-runner-ko.md`

Game pages must keep these fields complete:

- `layout: game`
- `title`, `badge`, `description`, `order`, `tester_cta`
- `banner`, `image`, `thumbnail`, `game_icon`
- `page_id` (starting with `game-`) and `permalink` (starting with `/games/`)
- `lang` (`en`, `uk`, `ru`, `ko`)
- `specs.platform`, `specs.engine`, `specs.performance`, `specs.rotary`, `specs.status`
- at least one `screenshots` item (`type: image` with `thumb`/`full` or `type: video` with `src`)

## Developer Tool Pages (`tools/`)

Tool landing pages (such as `tools/wearview-{en,uk,ru,ko}.md`) use `layout: tool` and require:

- `page_id` starting with `tool-` (e.g., `tool-wearview`)
- shared `permalink` starting with `/tools/` (e.g., `/tools/wearview/`)
- `banner`, `banner_alt`, `image`, `app_url`, `source_url`, `cta`, `source_cta`, `cta_note`
- `gallery_title`, `screenshots` (`src`, `alt`), and `faq` (`question`, `answer`)

Note: If `app_url` points to a standalone web app deployed from a sibling repository under `wristandpocket.dev` (such as `/wearview/`), wrap the link in `{% static_href %}href="/wearview/"{% endstatic_href %}` so Jekyll Polyglot does not rewrite it to `/uk/wearview/`.

## Front Matter CMS & Helper Scripts

`frontmatter.json` defines the content schemas (`Post`, `Game`, `Page`). The helper scripts in `.frontmatter/scripts/` (`auto-permalink.js`, `create-translations.js`, `sync-languages.js`, `check-seo.js`, `fix-frontmatter.js`) are aligned with Polyglot shared permalinks and automatically skip destructive normalization on `games/` and `tools/` files that contain nested YAML objects.

## Production Artifact Hygiene

Keep local workflow, audit, and tooling files in `_config.yml` `exclude` so GitHub Pages does not publish them as public URLs (`Docs/`, `scripts/`, `qa-evidence/`, `ci-results/`, `.agents/`, `.frontmatter/`, `README.md`, `GEMINI.md`, `CONTENT_WORKFLOW.md`, `DEPLOYMENT_CHECKLIST.md`, `LOCAL_JEKYLL_SETUP.md`, `package.json`, `frontmatter.json`, `service-worker.js`). `audit_site.rb` enforces that no `.rb`, `.ps1`, `.md`, `.log`, or `.toml` files leak into `_site/`.

## Publishing Checklist

Inside `web/studio-site`:

```bash
git status --short --branch
npm run verify
git diff --check
git add <explicit files>
git commit -m "..."
git push origin main
```

Then in the root studio workspace (`WristAndPocket-Studio`):

```bash
git status --short --branch
git diff --submodule
git add web/studio-site
git commit -m "chore: update site submodule pointer"
git push origin main
```
