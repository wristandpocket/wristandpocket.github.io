# Gemini Entry Point

Read the parent workspace `AGENTS.md` before planning or acting. This is the
only public repository in the workspace. Never copy private product, SDK,
strategy, license, credential, or unpublished material into it. Preserve locale
and responsive-layout parity required by the workspace contract.

Use CLI, browser, hosting, API, Drive, Docs, Sheets, and Slides tools with a
bounded budget: discover schema before unfamiliar mutations, batch independent
reads, perform at most one retry for an understood transient failure, and never
poll status in a conversational loop. Prefer targeted files, ranges, diffs, and
logs over whole-project or whole-document reads. If an operation unexpectedly
expands to many pages, slides, files, or repeated status checks, stop and report
the scope before continuing.

Planning, explanation, review, and diagnosis are read-only. Publishing,
deployment, external messages, and destructive actions require explicit owner
authorization.

## Local Search Startup

For local code work, start with the exact failing or requested symbol through
Serena and keep the first three diagnostic tool calls on its direct runtime
path. Use one repository-scoped `rg` only when Serena cannot represent the
reference. Do not begin with web search, recursive filesystem scans, whole-file
reads, dependency-wide searches, or test tours. Before widening scope, name the
one missing fact and the one lookup expected to resolve it. Use external
documentation only for a version-sensitive platform fact, in one batched
primary-source lookup with at most two relevant sources. Distinguish hypothesis,
source evidence, test evidence, browser/runtime proof, and deployment proof.
