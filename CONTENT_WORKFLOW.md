# Wrist & Pocket Site Content Workflow

This document is the operating guide for creating and verifying content in the Wrist & Pocket Studio Jekyll site.

## Core Model

- The site is a standalone Git repository and is tracked from the studio workspace as a Git submodule.
- Commit and push site changes inside `wristandpocket.github.io` first.
- Then commit and push the updated `wristandpocket.github.io` submodule pointer in the root studio workspace.
- English is the source language for files, docs, code comments, commit messages, and public site text.

## Local Command Notes

On Windows PowerShell, use `npm.cmd` rather than `npm` because the default execution policy may block `npm.ps1`.

Common commands:

```powershell
npm.cmd run preflight
npm.cmd run build
npm.cmd run verify
npm.cmd run check:images
```

`npm.cmd run verify` runs the checks that are expected to work locally on this Windows workspace:

- site preflight
- production Jekyll build
- JavaScript size budget

GitHub Actions also runs HTML Proofer:

```powershell
npm.cmd run verify:html
```

On Windows, HTML Proofer may fail if Ruby/MSYS2 cannot find `libcurl`. Treat the GitHub Actions Ubuntu result as authoritative unless local RubyInstaller/MSYS2 is repaired.

## Creating A New Blog Post

Use the scaffold command:

```powershell
npm.cmd run new:post -- --slug cyberpunk-devlog --title "Cyberpunk Devlog" --date 2026-06-15 --tag "Cyberpunk 3D"
```

This creates:

- `_posts/YYYY-MM-DD-cyberpunk-devlog-en.md`
- `_posts/YYYY-MM-DD-cyberpunk-devlog-uk.md`
- `_posts/YYYY-MM-DD-cyberpunk-devlog-ru.md`
- `_posts/YYYY-MM-DD-cyberpunk-devlog-ko.md`

The scaffold sets one shared `page_id` and one shared `permalink`:

```yaml
page_id: "cyberpunk-devlog"
permalink: "/blog/cyberpunk-devlog/"
```

Do not manually add `/uk`, `/ru`, or `/ko` to `permalink`. Jekyll Polyglot adds language prefixes when rendering localized URLs.

After editing the generated files, run:

```powershell
npm.cmd run preflight
```

## Creating A New Static Page

Use the scaffold command:

```powershell
npm.cmd run new:page -- --slug press-kit --title "Press Kit"
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

Use this flow for public pages such as press kits, support, tester instructions, or policies that are not game detail pages.

## Creating A New Game Page

Use the scaffold command:

```powershell
npm.cmd run new:game -- --slug neon-runner --title "Neon Runner" --badge "Prototype" --order 3
```

This creates:

- `games/neon-runner-en.md`
- `games/neon-runner-uk.md`
- `games/neon-runner-ru.md`
- `games/neon-runner-ko.md`

Game pages must keep these fields complete:

- `layout: game`
- `title`
- `badge`
- `banner`
- `image`
- `thumbnail`
- `game_icon`
- `description`
- `order`
- `tester_cta`
- `page_id`
- `permalink`
- `lang`
- `specs.platform`
- `specs.engine`
- `specs.performance`
- `specs.rotary`
- `specs.status`
- at least one `screenshots` item

The scaffold uses existing placeholder assets so preflight can pass, but real game pages should replace them before publication:

- `banner`
- `image`
- `thumbnail`
- `game_icon`
- `screenshots`

## Front Matter CMS

`frontmatter.json` defines three content types:

- `Post`
- `Game`
- `Page`

Use the matching content type when editing in Front Matter CMS. The `fix-frontmatter.js` normalizer intentionally refuses to rewrite `Game` files because game pages contain nested `specs` and `screenshots` data. Use scaffold scripts and `site-preflight.js` for game page safety.

The older language helper scripts are now aligned with Polyglot:

- `sync-languages.js`
- `create-translations.js`
- `auto-permalink.js`

All of them should keep shared permalinks without language prefixes.

## Preflight Rules

`site-preflight.js` is the main safety gate. It checks:

- crawler safety in `robots.txt`
- no accidental `noindex`, broad `nofollow`, or redirects
- canonical/hreflang template basics
- stable permalinks against `HEAD`
- language suffix matches `lang`
- localized groups contain `en`, `uk`, `ru`, and `ko`
- shared permalinks across translations
- no `/uk`, `/ru`, or `/ko` prefixes inside front matter permalinks
- game pages have required media and specs

Use URL changes only with a documented redirect/indexing plan:

```powershell
node .frontmatter/scripts/site-preflight.js --allow-url-change
```

## SEO Metadata Notes

`jekyll-seo-tag` appends the site title automatically. Do not include `Wrist & Pocket Studio` in ordinary page `title` front matter unless the page intentionally needs a custom full title. Otherwise generated titles become duplicated, for example:

```text
Wear OS Premium Smartwatch Games | Wrist & Pocket Studio
```

Keep source page titles short and query-focused:

```yaml
title: "Wear OS Premium Smartwatch Games"
```

Use the generated `_site` HTML to confirm titles, canonicals, descriptions, and `hreflang` output after SEO-sensitive edits.

## Production Artifact Hygiene

Jekyll copies many root files unless they are excluded. Keep local workflow and tooling files in `_config.yml` `exclude` so GitHub Pages does not publish them as public URLs.

Files that should stay out of `_site` include:

- `frontmatter.json`
- `package.json`
- `package-lock.json`
- `CONTENT_WORKFLOW.md`
- `DEPLOYMENT_CHECKLIST.md`
- `LOCAL_JEKYLL_SETUP.md`

`CNAME` is intentionally published because GitHub Pages uses it for the custom domain.

## Publishing Checklist

Inside the site repository:

```powershell
git status --short --branch
npm.cmd run verify
git diff --check
git add <explicit files>
git commit -m "..."
git push origin main
```

Then in the root studio workspace:

```powershell
git status --short --branch
git diff --submodule
git add wristandpocket.github.io
git commit -m "chore: update site submodule pointer"
git push origin main
```

## Known Follow-Ups

- Convert or intentionally whitelist remaining PNG assets reported by `npm.cmd run check:images`.
- Repair local Windows HTML Proofer support by fixing RubyInstaller/MSYS2 `libcurl`.
- Add visual QA screenshots for desktop, mobile, and narrow mobile when layout-heavy changes are made.
