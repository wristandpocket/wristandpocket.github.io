# Studio site audit and delivery evidence

Scope: `wristandpocket/wristandpocket.github.io`, branch `main`. Initial working tree was clean. Figarist was a read-only visual and verification reference; no other repository was changed.

## Initial findings

| Priority | Evidence | Finding and resolution |
| --- | --- | --- |
| P1 | `_layouts/game.html` original JSON-LD | Invented USD 0.00 preorder and device support. Replaced with CreativeWork describing the visible development project, without Offer, rating or release claims. |
| P1 | Game front matter versus `index.html`, `game-card.html` | Paused projects advertised as coming soon. Visible paused status and unavailable download now agree; no fake store button. |
| P1 | Baseline `_site/uk/index.html` | Two canonicals, two x-default links, incomplete alternates. Explicit reciprocal five-link sets, one canonical, localized OG and JSON-LD identities. |
| P1 | `.frontmatter/scripts/site-htmlproofer.js` | All site-domain and image URLs ignored. Local target/anchor/media auditing now has no domain exclusions. External responses are reported separately. |
| P1 | `_config.yml` excludes | Operational directories were not explicitly excluded. Docs, scripts, evidence and CI reports now excluded, with a deployment gate. |
| P2 | `/uk/` before screenshots | Same two products in adjacent collections. One project presentation, then dated news, studio approach and contact links. |
| P2 | Original home and game templates | Copy over bright screenshots. Separate opaque text surfaces, responsive layouts, less decorative motion. |
| P2 | `assets/js/script.js` | Mouse-only gallery, no modal focus contract. Native dialog, keyboard opening, arrows, Escape and focus restoration; videos have native controls. |
| P2 | `_includes/lang-redirect.html` | English selection could redirect back to stored locale. Explicit language links now always win. |
| P2 | Header, footer, game labels, Ukrainian posts | Mixed labels, country flags and English footer. Native language names and UK language code, translated footer and topic labels, Ukrainian prose cleanup. |
| P2 | Original service worker | Remote Workbox runtime and obsolete HTML precaching. Existing registration receives a retirement worker; new HTML references versioned CSS/JS. |
| P2 | Blog announcement | Old testing announcement looked current. Search snippet marked archival and every dated post links to current project status. Existing post URLs remain. |
| P2 | Contact and 404 routes | No dedicated support page or custom 404. Added in all four languages; 404 excluded from indexing and sitemap. |

## Verified and unverified claims

| Claim | Evidence level |
| --- | --- |
| Both Discord invitations resolve to Wrist & Pocket | VERIFIED through Discord public API, 2026-09-13; guild 1509239145103360040. `6vzt33SX9D` targets become-a-tester; `nCPuHr8rve` targets suggestions. Neither response supplies an expiry. |
| Both projects paused, no public download URL | REPORTED by existing project front matter; retained conservatively, not inferred from old announcements. Owner clarification requested. |
| Supported watch models, Wear OS 3+, stable FPS, battery savings, first-of-kind | NOT VERIFIED; removed as current product promises. |
| Media exists and plays | Local assets retained; browser playback evidence is in `qa-evidence/video-proof.json`. This is not device or game execution evidence. |
| Separate website analytics | No counter found in source or live script inventory. No new analytics service installed. No click called an installation or tester acquisition. |

## Verification contracts

- `npm run verify:routes`: every generated HTML page, canonical/OG, unique locale metadata, reciprocal hreflang, JSON-LD parsing/identity, internal pages/assets/anchors, sitemap equality, robots, development leakage and frozen 40 previously published HTML routes.
- `npm run test:audit`: temporary build copy rejects missing asset, broken anchor, duplicated alternate, wrong canonical, noindex, localhost, removed route, incorrect sitemap and operational file leak; restored copy must pass. Temporary copy removed automatically.
- Existing preflight, JS budget and generated accessibility checks retained. HTMLProofer performs local checks without broad URL exclusions.
- `node scripts/check_external_links.js`: checks the audit inventory; 404/410 are failures, 403/429/network errors require review. No whole-domain allowlist. Latest run: nine reachable URLs, Icons8 HTTP 403 retained as an external access limitation.
- Browser matrices: all 48 HTML routes at 390x844 and 1280x900; H1, locale, document overflow and loaded-image failure checks. These DOM measurements are not a claim of manual pixel inspection of every page.
- Focused manual browser checks: home, catalogue, both projects, blog filtering, language switching, support links, privacy and 404; native gallery keyboard controls; all three WebM files reach their ends without media errors.

## Local environment limitations

Ruby 3.4.8 can build the site and run Nokogiri audits. Local HTMLProofer cannot load libcurl (Windows error 126). A bounded local Git-libcurl attempt also failed. Linux GitHub Actions remains the required independent HTMLProofer gate. No system-wide runtime or PATH changes were made.

Screenshots and raw reports are retained locally under `qa-evidence/`, excluded from the public build and Git. The repository's public technical audit contains no private game source, roadmap or author account material.

## Missing author material

Confirm current project status, a real store/testing URL when available, minimum OS and tested model matrix, and measured performance methodology/results before publishing those claims. New release media should identify the exact public build. Current historical screenshots are not relabelled as a release.

## Search Console follow-up

The existing verification meta token is preserved. Submit `https://wristandpocket.dev/sitemap.xml` in the verified property. Inspect the four locale homepages and both product routes: confirm selected canonical and rendered content, then request indexing for materially updated pages. Monitor Pages, video indexing and crawl errors after recrawl. Search visibility and indexing timing are controlled by the search engine, not guaranteed by passing site checks.
