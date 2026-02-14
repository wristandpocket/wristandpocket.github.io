# Wrist & Pocket Studio — GitHub Pages Site

> **Owner:** Ihor (Figarist) · **Email:** wristandpocket.studio@gmail.com  
> **Live:** https://wristandpocket.github.io · **Repo:** https://github.com/wristandpocket

## What Is This

Official static website for **Wrist & Pocket Studio** — an indie game studio with two directions:

| Direction | Audience | Accent Color | Section ID |
|-----------|----------|-------------|------------|
| **Wrist** (Premium) | Polished Wear OS smartwatch games | Teal `#03dac6` | `#wrist` |
| **Pocket** (Education) | Student projects mentored by Figarist | Purple `#bb86fc` | `#pocket` |

**Core philosophy:** "No trash" — only thoughtful, quality games.

## Tech Stack

- **Pure HTML5 + CSS3 + Vanilla JS** (no frameworks, no build tools)
- **Hosted on GitHub Pages** (static, no server)
- **Google Fonts:** Inter (300–800)
- **Design System:** "OLED Noir" — deep black backgrounds, teal/purple accents, minimalist futuristic aesthetic

## File Structure

```
/
├── index.html          ← EN homepage (lang="en")
├── privacy.html        ← EN privacy policy
├── styles.css          ← Shared design system (ALL pages use this)
├── sitemap.xml         ← SEO sitemap with hreflang annotations
├── robots.txt          ← Points to sitemap
└── uk/
    ├── index.html      ← UK homepage (lang="uk")
    └── privacy.html    ← UK privacy policy
```

## Design Tokens (CSS Variables in `:root`)

```
--bg: #050505           --accent-teal: #03dac6      --text-primary: #e8e8e8
--bg-surface: #121212   --accent-purple: #bb86fc    --text-secondary: #999999
--bg-card: #1a1a1a      --radius: 12px              --text-dim: #555555
```

## How To Add a Game

1. Open `index.html` (EN) AND `uk/index.html` (UK) — both must be updated
2. Find the section: `wrist__grid` (premium) or `pocket__grid` (student)
3. Copy any `<!-- GAME CARD -->` block and paste it inside the grid
4. Update: icon/image, title, description, Google Play link
5. Card uses Schema.org `SoftwareApplication` microdata — keep `itemprop` attributes

### Card Template (Wrist)
```html
<article class="game-card" itemscope itemtype="https://schema.org/SoftwareApplication">
    <meta itemprop="applicationCategory" content="Game">
    <meta itemprop="operatingSystem" content="Wear OS">
    <div class="game-card__media">
        <div class="game-card__icon" style="display:flex;align-items:center;justify-content:center;font-size:2rem;">🎮</div>
        <span class="game-card__badge-overlay game-card__badge-overlay--wrist">Wear OS</span>
    </div>
    <div class="game-card__body">
        <h3 class="game-card__title" itemprop="name">Game Title</h3>
        <p class="game-card__desc" itemprop="description">Short description.</p>
        <a href="https://play.google.com/..." class="game-card__cta game-card__cta--teal" itemprop="url">▶ Google Play</a>
    </div>
</article>
```

For **student cards**: use `game-card__cta--purple`, `game-card__badge-overlay--pocket`, add `<p class="game-card__meta">` for student name + genre.

## SEO Checklist (Already Implemented)

- [x] `hreflang` (en, uk, x-default) on every page
- [x] `<link rel="canonical">` on every page
- [x] JSON-LD: `Organization` + `WebSite`
- [x] Schema.org `SoftwareApplication` microdata on every game card
- [x] Open Graph + Twitter Card meta tags
- [x] `sitemap.xml` with hreflang `xhtml:link` per URL
- [x] `robots.txt` → sitemap
- [x] Semantic HTML5 (`header`, `section`, `article`, `footer`, `nav`, `main`)
- [x] `focus-visible` accessibility styles

## Critical Rules for AI Agents

1. **Both languages** — any content change MUST be applied to both `index.html` AND `uk/index.html`
2. **No frameworks** — do NOT introduce React, Vue, Tailwind, or any build tools
3. **Relative paths** — all internal links use relative paths (e.g., `uk/index.html`, `../index.html`), NOT absolute (`/uk/`)
4. **Keep hreflang in sync** — if you add a new page, add hreflang tags to ALL pages and update `sitemap.xml`
5. **OLED Noir** — maintain dark aesthetic. No white backgrounds. No bright colors outside the teal/purple palette
6. **Privacy policy** — Google Play requires this. Don't delete `privacy.html`
7. **Shared CSS** — `styles.css` is shared by all pages. UK pages reference it as `../styles.css`