# W&PSTUDIO Design System & Anti-AI OLED Noir Specification

> **Version:** 1.0  
> **Status:** Canonical Standard  
> **Scope:** Public Studio Website (`wristandpocket.dev` / `web/studio-site`)  
> **Updated:** November 2026  

---

## 1. Executive Summary & Anti-AI Philosophy

The **W&PSTUDIO Design System** establishes a strict, engineering-first aesthetic tailored for a Wear OS game and tooling studio. In contrast to generic "AI-generated" web design—characterized by excessive radial gradients, arbitrary neon blur halos, jittery card zooms, and meaningless emoji embellishments—this system adheres to **OLED Noir**:
1. **True OLED Black Baseline:** Backgrounds prioritize `#0a0b0e` and `#07080a`, maximizing contrast, battery efficiency on wearable AMOLED displays, and crisp edge delineation.
2. **Deterministic Geometric Layout:** Interface containers use precise 1px hairline borders (`#1e2430`) and subtle brightness shifts on hover, completely eliminating CPU-heavy `backdrop-filter: blur()` and disorienting `scale(1.07)` card jitter.
3. **Zero Emojis Policy:** Unicode emojis are strictly forbidden across UI components, templates, and editorial copy. All semantic actions use crisp, monochrome, inline SVGs (`currentColor`).
4. **CSS Performance Budget:** Compiled CSS is strictly capped at **< 30 KB** (achieved: **28.1 KB**, reduced from legacy 61.5 KB).

---

## 2. Brand Identity & Colorimetry

### 2.1 The `W&PSTUDIO` Brand Mark
The studio wordmark is an integrated geometric lockup. Derived from pixel-level chromatic analysis of studio master artwork, the mark pairs wrist-cyan with pocket-lavender anchored by neutral off-white.

| Element | Glyph | Hex Color | SCSS Token | Semantic Role |
| :--- | :--- | :--- | :--- | :--- |
| **Wrist** | `W` | `#46f0d2` | `$wp-mint` | Wrist hardware, telemetry, active interaction |
| **Connector** | `&` | `#e6e5e0` | `$wp-text` | Structural ampersand |
| **Pocket** | `P` | `#c39afa` | `$wp-lavender` | Pocket companion, game logic, depth |
| **Suffix** | `STUDIO` | `#e6e5e0` | `$wp-text` | Engineering studio monolithic suffix |

#### Typography & Geometry
- **Font:** IBM Plex Sans (weight: 800 / ExtraBold)
- **Letter Spacing:** `-0.025em` (tightly locked geometric wordmark)
- **Spacing:** Zero whitespace between `P` and `STUDIO` (`<span class="brand-p">P</span><span class="brand-tail">STUDIO</span>`)
- **Hover Micro-interaction:** Subtle lightness boost (+8%) on brand initials without geometry distortion:
  ```scss
  .site-nav__brand {
    font-family: $font-sans;
    font-weight: 800;
    font-size: 1.2rem;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: baseline;
    text-decoration: none;
    line-height: 1;
    white-space: nowrap;

    .brand-w { color: #46f0d2; transition: color 150ms ease; }
    .brand-amp { color: #e6e5e0; font-weight: 700; }
    .brand-p { color: #c39afa; transition: color 150ms ease; }
    .brand-tail { color: #e6e5e0; font-weight: 800; }

    &:hover {
      .brand-w { color: color.adjust(#46f0d2, $lightness: 8%); }
      .brand-p { color: color.adjust(#c39afa, $lightness: 8%); }
    }
  }
  ```

### 2.2 Neutral & Surface Palette

```scss
// Surfaces
$wp-bg-deep:        #0a0b0e; // Canvas root
$wp-bg-card:        #11141a; // Elevated card surface
$wp-bg-card-hover:  #161b24; // Hover elevated state
$wp-bg-sunken:      #07080a; // Inset panels, code blocks

// Hairline Borders
$wp-border:         #1e2430; // Standard component divider (1px solid)
$wp-border-subtle:  #171b24; // Low-contrast inner borders
$wp-border-bright:  #2f384a; // Focus & active indicator

// Typography & Contrast
$wp-text:           #e6e9ef; // Primary readable copy (WCAG AAA on deep)
$wp-text-muted:     #8b95a7; // Secondary descriptions, metadata
$wp-text-subtle:    #555f73; // Timestamps, captions, subtle labels
```

---

## 3. Dual-Font Architecture

The typography stack unites clean technical legibility with native Wear OS arcade nostalgia.

```
Typography Stack
├── Technical Body & Headings: IBM Plex Sans (Light, Regular, Medium, SemiBold, Bold)
├── Arcade Telemetry & Badges: Pixeloid Sans & Pixeloid Mono (400)
└── Monospace Code Blocks:     Pixeloid Mono / IBM Plex Mono / Fira Code fallback
```

### 3.1 Font Implementations & Assets
All fonts are self-hosted within `assets/fonts/` for zero third-party tracking, zero layout shifts, and predictable offline rendering:
- `assets/fonts/IBMPlexSans-Regular.ttf` & `IBMPlexSans-Bold.ttf`: Primary grotesque typeface.
- `assets/fonts/PixeloidSans.ttf`: Pixel-grid proportional font from the studio's watch game runtime (`platform/wearos-core`).
- `assets/fonts/PixeloidMono.ttf`: Pixel-grid monospaced font for telemetry, status badges, and hardware stats.

### 3.2 Font Utility Classes
- `.brand-pixel`: Direct access to `Pixeloid Sans` with pixelated font rendering:
  ```scss
  .brand-pixel {
    font-family: 'Pixeloid Sans', monospace;
    letter-spacing: 0.04em;
    image-rendering: pixelated;
  }
  ```
- Badges and Tags:
  ```scss
  .hero__badge, .game-card__genre, .tech-badge {
    font-family: 'Pixeloid Sans', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  ```

---

## 4. Zero Emojis Policy & Iconography

### 4.1 The Rule
**Unicode emojis (such as game controllers, rockets, computers, sparkles, winks, or play symbols)** are strictly prohibited in the studio code repository and content:
- Emojis render inconsistently across Android, iOS, Windows, and Linux.
- Emojis break the disciplined, precision-hardware identity of Wear OS development.
- Emojis in buttons (e.g. `▶ Play Store`) create accidental visual clutter and baseline alignment bugs.

### 4.2 Vector SVG Replacements
All interactive icons must be inline SVGs using:
- `fill="currentColor"` or `stroke="currentColor" stroke-width="2"`
- Bounding box: 16×16px or 20×20px
- `aria-hidden="true"` on decorative icons, or explicit accessible labels on stand-alone icon links.

**Standard Icons:**
- **GitHub:** Monochrome GitHub silhouette SVG.
- **Email:** Feather/Lucide Mail SVG outline.
- **Home:** Architectural home SVG outline.
- **Discord:** Monochrome game community mark.
- **External Link:** Diagonal arrow-square SVG indicator.

### 4.3 Studio Favicon (`assets/images/favicon-wp.svg`)
The favicon replaces legacy third-party raster images with an SVG vector mark:
- 32×32 viewBox with a dark rounded square background (`#0a0b0e`).
- Stylized `W` (Mint `#46f0d2`) and `P` (Lavender `#c39afa`) monograms.
- Linked canonically in `_includes/head.html`.

---

## 5. CSS Architecture & Performance Budget

### 5.1 Budget Constraints
- **Compiled `styles.css` Budget:** `< 30,000 bytes` uncompressed.
- **Observed Production Size:** **28,188 bytes** (Pass).
- **Enforcement:** Verified on every build via `(Get-Item _site\styles.css).Length`.

### 5.2 Anti-AI Sanitations
1. **Purge of Backdrop Filter:** Removed all 16 occurrences of `backdrop-filter: blur()`. Blur filters cause significant GPU compositor layer thrashing on low-end devices and mobile browsers.
2. **Purge of Glow Blobs:** Removed all 20 occurrences of `radial-gradient` glow overlays and pseudo-element blurs. Surfaces are defined by clean 1px border contrast.
3. **Purge of Hover Zoom Jitter:** Replaced `transform: translateY(-4px) scale(1.07)` with flat border lighting:
   ```scss
   // Standard Card Interaction Pattern
   .game-card {
     border: 1px solid $wp-border;
     background: $wp-bg-card;
     transition: border-color 150ms ease, background-color 150ms ease;

     &:hover {
       border-color: $wp-border-bright;
       background: $wp-bg-card-hover;
       // Transform is strictly omitted to preserve subpixel text sharpness
     }
   }
   ```
4. **Purge of Hidden DOM Bloat:** Removed legacy `noSHOVEL.webp` (39.8 KB dead DOM image).

---

## 6. Verification & Automated Quality Assurance

Every modification to the studio site must pass three automated regression gates before deployment:

### 6.1 Jekyll Build Check
```bash
bundle exec jekyll build
```
- Validates Jekyll Spaceship extensions, feed generation, syntax highlighting, and SASS compilation.
- Output: zero compilation errors.

### 6.2 Quality Gate (`npm run verify:quality`)
```bash
npm run verify:quality
```
- Audits all 56 generated HTML pages (across `en`, `uk`, `ru`, `ko`).
- Verifies:
  - Zero broken anchor tags (`href` presence and validity).
  - Proper canonical URL mapping and meta tags.
  - Heading hierarchy integrity (`h1` uniqueness).
  - Localization parity across language routes.

### 6.3 Mobile Browser Contract (`node scripts/check_mobile_browser.js`)
```bash
node scripts/check_mobile_browser.js
```
- Drives a headless Chromium/Edge instance at **320×568** viewport (simulating compact mobile devices and watch-companion browser webviews).
- Enforces:
  - `scrollWidth === 320` (Zero horizontal overflow).
  - Touch targets $\ge 44 \times 44\text{px}$ for navigation elements.
  - Image load completeness (`complete === true` and valid `naturalWidth`).
  - Route validation across `/`, `/uk/games/`, `/games/cyberpunk-3d/`, `/tools/wearview/`, `/blog/`, and `/404.html`.

---

## 7. Editorial & Copy Guidelines (De-Slop)

- **Tone:** Concise, technical, confident, grounded in hardware reality.
- **Wear OS Facts:** Explicitly highlight battery stewardship, small-screen ergonomic design, standalone rotary input, and offline resilience.
- **Forbidden Phrasing:** Avoid hyperbolic generic AI marketing jargon ("experience the magic", "dive into an unforgettable adventure", "revolutionary gaming experience"). State what the software actually does.
