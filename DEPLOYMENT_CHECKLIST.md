# Deployment Checklist

Use this checklist before pushing changes to `main`, especially while the site is tracked in Google Search Console.

## Before Editing

- Decide whether the change affects content, layout, metadata, URLs, sitemap, robots, or service worker behavior.
- If URLs, canonical tags, hreflang, sitemap, or robots rules are involved, write the expected indexing effect before changing code.
- Do not change `permalink` values unless a redirect and Search Console follow-up plan exists.

## Local Preflight

Run the static guardrail:

```powershell
npm.cmd run preflight
```

This checks:

- no accidental `noindex`, broad `nofollow`, or whole-site `Disallow`;
- stable permalinks compared with `HEAD`;
- required language variants for grouped content;
- game page social images and media assets;
- baseline canonical, hreflang, sitemap, and crawler redirect guards.

Only use the escape hatch for intentional URL work:

```powershell
node .frontmatter/scripts/site-preflight.js --allow-url-change
```

Use it only after documenting the redirect/indexing plan.

For the usual local verification pass:

```powershell
npm.cmd run verify
```

GitHub Actions additionally runs:

```powershell
npm.cmd run verify:html
```

If this fails locally on Windows because `libcurl` is missing, rely on the GitHub Actions result or repair the RubyInstaller/MSYS2 Devkit setup before treating local HTML Proofer as authoritative.

## Push And Deploy

- Push to `main` only after local preflight passes.
- Confirm the GitHub Actions Jekyll workflow succeeds.
- Do not judge the deployment from the homepage alone; spot-check:
  - `/`
  - `/games/`
  - `/games/cyberpunk-3d/`
  - `/games/feed-me-loser/`
  - `/blog/`
  - `/privacy/`
  - `/uk/`, `/ru/`, `/ko/`
  - `/sitemap.xml`
  - `/robots.txt`

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
- localized pages lose hreflang alternates;
- canonical URLs point to the wrong language or path;
- GitHub Actions deploys a broken `_site`;
- Search Console reports new critical indexing errors after the deployment.
