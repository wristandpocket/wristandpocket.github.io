# Wrist & Pocket Studio — GitHub Pages Site (Jekyll Edition)

> **Owner:** Ihor Sivochka (Figarist) · **Email:** wristandpocket.studio@gmail.com  
> **Live:** https://wristandpocket.dev · **Repo:** https://github.com/wristandpocket

---

## 🏗️ Architecture & Tech Stack

This repository is built using **Jekyll 4.x** and deployed automatically via **GitHub Actions**. It is configured as a highly optimized, quadrilingual website (supporting English, Ukrainian, Russian, and Korean) using the same workspace patterns and Front Matter CMS integration as [figarist.github.io](https://figarist.github.io).

### Core Plugins
*   **jekyll-polyglot** — Handles multilingual paths (`/` for EN, `/uk/` for UK, `/ru/` for RU, `/ko/` for KO) in a DRY manner.
*   **jekyll-seo-tag** — Generates search engine meta, Open Graph, Twitter cards, and structured JSON-LD schemas automatically.
*   **jekyll-spaceship** — Renders Mermaid diagrams, MathJax formulas, and media embeds in posts.
*   **jekyll-minifier** — Minifies HTML, CSS, and JS to keep payload size tiny.
*   **jekyll-pwa-workbox** — Generates Service Worker (`sw.js`) for offline-first caching.
*   **jekyll-toc** — Auto-generates Table of Contents for posts.

---

## 📂 File Structure

```
/
├── .frontmatter/       ← Front Matter CMS scripts (SEO check, translation sync)
├── .github/workflows/  ← CI/CD pipeline (Jekyll build → HTML Proofer → Deploy)
├── _data/              ← Localization dictionaries
│   ├── en/strings.yml  ← English strings (Default)
│   ├── uk/strings.yml  ← Ukrainian strings
│   ├── ru/strings.yml  ← Russian strings
│   └── ko/strings.yml  ← Korean strings
├── _includes/          ← Reusable Liquid components (head, header, footer)
├── _layouts/           ← Page wrappers (default, post)
├── _plugins/           ← Ruby patches (polyglot_frozen_string_patch.rb)
├── _posts/             ← Developer news posts (4 lang versions per post)
├── _sass/              ← Modular SCSS partials
├── assets/
│   └── js/script.js    ← Client-side Vanilla JS (tag filters)
├── blog/
│   └── index.html      ← News feed page with tags filter
├── index.html          ← Homepage (Variant A: Bio, Philosophy, Games, News)
├── privacy-*.md        ← Localized Privacy Policies (en, uk, ru, ko)
├── manifest.json       ← PWA manifest
├── service-worker.js   ← Workbox SW entry point
├── styles.scss         ← Master SCSS manifest (compiles to styles.css)
├── sitemap.xml         ← Custom sitemap generating localized URLs with hreflang
└── robots.txt          ← Crawling rules pointing to sitemap
```

---

## 🌐 Multilingual Sync (EN · UK · RU · KO)

### The Golden Rule
**One permalink. Four files. All in sync.**  
English (`en`) is the default language. Every post or page must exist in 4 language versions with the **exact same `permalink`** and matching `page_id` so `jekyll-polyglot` can map `hreflang` tags correctly.

#### Post File Suffixes:
*   `-en.md` (lang: `en`)
*   `-uk.md` (lang: `uk`)
*   `-ru.md` (lang: `ru`)
*   `-ko.md` (lang: `ko`)

### YAML Front Matter for Posts
```yaml
---
layout: post
title: "Hello World!"
description: "Introductory post about our studio."
date: YYYY-MM-DD
lang: en # en / uk / ru / ko
page_id: "hello-world" # Identical across all 4 translations
permalink: /blog/hello-world/ # Identical across all 4 translations
tags: ["Wrist & Pocket"] # Game name tags for filtering
author: ihor
published: true
fmContentType: "Post"
---
```

---

## 🎨 Design System: OLED Noir

The design is configured to match the cyberpunk / smartwatch theme:
*   **Background:** Deep space black (`#0a0a0f`) with soft cyan/purple gradients.
*   **Cards:** Dark glassmorphism (`rgba(22, 22, 29, 0.7)`) with border highlight on hover.
*   **Typography:** Google Font `Outfit` for body text and `Fira Code` for monospace tags.
*   **Styles Layout:** Split into modular partials inside `_sass/` (`_variables.scss`, `_base.scss`, `_layout.scss`, `_cards.scss`, `_post.scss`). Root `styles.scss` compiles these on build.

---

## ⚡ Client-Side Tag Filtering

We avoid bloated search scripts and reload-heavy tag pages.
*   The news page `/blog/` extracts unique tags from posts.
*   [assets/js/script.js](assets/js/script.js) parses the `data-tags` attribute on `.news-card` items and filters them instantly on click.

---

## ✏️ VS Code Front Matter CMS

Manage content easily using the [Front Matter CMS](https://frontmatter.codes/) extension:
1.  **Create post:** Open CMS panel → click "Create Content" → choose **Post**.
2.  **Translate post:** Fill out metadata for EN, then click **🌐 Create Missing Translations** to stub files for `uk`, `ru`, and `ko`.
3.  **Sync metadata:** Use **🔄 Sync All Languages** action to copy `page_id` and `permalink` across translations.

---

## 🚀 Deployment & CI/CD

All builds are handled automatically in the cloud via GitHub Actions workflow [.github/workflows/jekyll.yml](.github/workflows/jekyll.yml).
*   **Deploy trigger:** On every push to `main` branch.
*   **Deployment settings:** In repo Settings → Pages → Build and deployment → Source **MUST** be set to **"GitHub Actions"**.
*   **No local Ruby needed:** You do not need to install Ruby/Bundler locally. Just commit your Markdown/YAML/SCSS edits, and let GitHub handle the compilation.

### Preflight Before Push

Before pushing SEO, localization, game page, sitemap, or metadata changes, run:

```powershell
npm.cmd run preflight
```

This static guard checks URL stability, localization groups, game media assets, crawler directives, and baseline Search Console safety rules. See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for the full release flow.

For creating posts, pages, and game detail pages, see [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md).

For the usual local verification, run:

```powershell
npm.cmd run verify
```

GitHub Actions also runs HTML Proofer. On Windows, that check may require MSYS2/libcurl support:

```powershell
npm.cmd run verify:html
```

For local Ruby/Jekyll setup on Windows, see [LOCAL_JEKYLL_SETUP.md](LOCAL_JEKYLL_SETUP.md).

### ⚠️ HTML Proofer Rules for Placeholders & Assets
During build validation, **HTML Proofer** checks that all referenced images, external links, and stylesheets exist.
*   **Rule:** If you add a temporary placeholder image or path (like flags `/assets/images/flags/*.png` or screenshots `/assets/images/games/*.webp`) that is not yet physically committed to the repository, you **MUST** configure HTML Proofer to ignore this path.
*   **Implementation:** Add the path/regex to `--ignore-urls` in [.github/workflows/jekyll.yml](.github/workflows/jekyll.yml) (e.g. `,/assets\/images\//`).
*   **Cleanup:** Once the actual files are committed, you should remove the ignore rule so that broken links/assets can be caught normally.
