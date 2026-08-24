# Continuous integration

`jekyll.yml` runs preflight, Jekyll generation, HTML Proofer, and the
JavaScript size budget for pull requests targeting `main`, main pushes, and
manual dispatch. Pull requests upload only a bounded verification report; the
Pages artifact and deployment steps are explicitly skipped. Main pushes and
manual dispatch repeat the same gates before uploading a Pages artifact and
deploying to the `github-pages` environment. A failed verification cannot
deploy.

The workflow uses read-only contents permissions for source inspection. Pages
write and OIDC permissions exist only on the deployment job. It does not claim
browser, accessibility, search-engine, production-host, or device evidence;
those remain separate release checks.
