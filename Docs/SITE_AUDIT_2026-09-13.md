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

## Final polish pass — 2026-09-13

The final review closed the remaining small consistency and accessibility gaps:

- Header navigation now exposes `aria-current="page"` for the active catalogue, news, contact and project routes. The current language uses the standard `page` token as well.
- Back-to-catalogue, topic filters, “show all” and social links now keep a 44px minimum touch target. External footer and contact links use an explicit new-tab and `noopener noreferrer` contract.
- Open Graph and X/Twitter image alt metadata are emitted from the localized page title.
- Homepage JSON-LD no longer emits a self-referential `BreadcrumbList`; the route audit now guards all four localized homepages against that regression.

Fresh local evidence after the pass: Jekyll served the root, Ukrainian homepage, both project routes and the blog; the project hero and media rendered; the Development filter reduced the post list; the gallery opened at media 2 and closed with Escape; Ukrainian navigation and localized links remained reciprocal. Existing browser matrices still cover all 48 routes at 390x844 and 1280x900.

Automated results after the pass: `npm run preflight`, `npm run build`, `npm run verify:routes` (48 pages, 1,448 URL references, 0 errors), `npm run verify:quality`, `npm run verify:js` (1,924 bytes), `npm run check:images` and `npm run test:audit` all pass. Local `npm run verify:html` remains unavailable because Ruby cannot load libcurl on Windows (error 126); the Linux GitHub Actions gate is the required independent HTMLProofer result. The Icons8 endpoint remains the only external inventory response requiring review (HTTP 403).

Commit `2865151104a961bcecf764afe7565703dd699beb` was published through [GitHub Actions run 34765348162](https://github.com/wristandpocket/wristandpocket.github.io/actions/runs/34765348162), with both build and Pages deployment jobs successful. A post-deploy probe returned HTTP 200 for `/`, `/uk/`, `/ru/`, `/ko/`, `/games/cyberpunk-3d/` and `/contact/`, with the expected canonical and five-link hreflang set; the intentional missing route returned HTTP 404 and the custom page. The live browser rechecked the root, Ukrainian locale, project hero, topic filter, gallery open/Escape close and custom 404.

## Local environment limitations

Ruby 3.4.8 can build the site and run Nokogiri audits. Local HTMLProofer cannot load libcurl (Windows error 126). A bounded local Git-libcurl attempt also failed. Linux GitHub Actions remains the required independent HTMLProofer gate. No system-wide runtime or PATH changes were made.

Screenshots and raw reports are retained locally under `qa-evidence/`, excluded from the public build and Git. The repository's public technical audit contains no private game source, roadmap or author account material.

## Missing author material

Confirm current project status, a real store/testing URL when available, minimum OS and tested model matrix, and measured performance methodology/results before publishing those claims. New release media should identify the exact public build. Current historical screenshots are not relabelled as a release.

## Search Console follow-up

The existing verification meta token is preserved. Submit `https://wristandpocket.dev/sitemap.xml` in the verified property. Inspect the four locale homepages and both product routes: confirm selected canonical and rendered content, then request indexing for materially updated pages. Monitor Pages, video indexing and crawl errors after recrawl. Search visibility and indexing timing are controlled by the search engine, not guaranteed by passing site checks.

## Narrow post-release hardening pass — 2026-09-13

This pass was performed locally on `main` at the requested post-release baseline. It was not published or pushed.

- The four localized Cyberpunk 3D pages no longer present GPU rendering performance, sustained FPS, thermal throttling, frame-stutter frequency, compatibility minimums, or published device results as established facts. Their FAQ now describes those items as possible experiment dimensions and explicitly says that validated methodology and device results are not published. The visible badge/spec wording is also benchmark-style/experimental rather than a measured-result promise.
- The four historical `2026-05-27-hello-world-*` sources now state that the announcement is dated and not current evidence of availability, compatibility, or performance. Each keeps a prominent direct link to the Cyberpunk 3D project page for current status. The shared post layout's archive note remains in place.
- The same unconfirmed Wear OS minimum-version wording was removed from the four Feed Me, Loser! FAQ sources; no model matrix or minimum OS was invented.
- `npm run verify:source-claims` is a narrow source/generated regression guard. It scans renderable Markdown/front matter, localized data/templates, and `_site` HTML for asserted performance results, concrete device minimum/support claims, and store/test listings or URLs. It intentionally permits neutral technical discussion and explicit experiment/disclaimer wording. It scanned 54 source files and 48 generated HTML files in this pass.
- `npm run test:source-claims` proves rejection of a source performance claim, a front-matter `Wear OS 3+` claim, and a generated Play Store URL, and proves that neutral technical discussion is allowed.
- `npm run verify:browser-320` uses the installed system Chrome through the DevTools Protocol and a dependency-free local static server. At `320x568`, `/`, `/uk/games/`, `/games/cyberpunk-3d/`, `/blog/`, and `/404.html` all passed document overflow, loaded-image, one-H1, `html[lang]`, active navigation, and 44x44 navigation-target checks. It is a rendered DOM/browser smoke check, not full manual visual QA, device testing, or accessibility certification. No Playwright/Puppeteer dependency or browser download was added.
- The footer attribution now targets the official Icons8 license/attribution page: `https://icons8.com/license`. The source remains a real attribution link, but this automated inventory currently receives HTTP 403 and records it as `requires-review`; no allowlist or 403 masking was added. The official page's attribution guidance remains the reason for the URL choice.

### Evidence boundaries for this pass

| Evidence class | This pass establishes | This pass does not establish |
| --- | --- | --- |
| Local source/build | Preflight, Jekyll build, source-claim guard, negative guard test, route audit, generated quality, JS budget, image policy, disposable audit mutation test, and the local 320px Chrome DOM check passed. | A clean Linux HTMLProofer run or a new production deployment. |
| CI | The existing Linux GitHub Actions HTMLProofer/deploy result at the confirmed baseline remains the required CI gate. | This unpushed hardening diff has not run in GitHub Actions yet. |
| Live browser | The prior live 320px evidence for `/` and `/uk/games/` remains historical live evidence; the five-route 320px result above is local Chrome evidence. | A new live production check after this unpushed change, cross-browser coverage, manual visual inspection of every route, or device execution. |
| Owner-provided | None added. | Store/test URL, supported watch models, minimum Wear OS version, FPS, battery, thermal, GPU, or other performance results remain unverified owner-level inputs. |

Local result details: `npm run verify:routes` reported 48 pages, 1,452 URL references, and 0 errors; `npm run verify:quality`, `npm run verify:js`, `npm run check:images`, `npm run test:audit`, and `git diff --check` passed. `npm run verify:html` remains locally blocked on Windows by the known missing `libcurl` load (error 126); Linux CI is the mandatory HTMLProofer gate. The external inventory reported nine reachable external URLs and the Icons8 URL as `requires-review` (HTTP 403).
