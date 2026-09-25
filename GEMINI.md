## Owner Test Budget Policy (2026-09-25)

- Applies to every project and test runner, including Unity, web, backend and
  scripts. Use the smallest check justified by the changed behavior. Passing
  focused tests never authorizes a full suite, before commit or otherwise.
- This owner policy supersedes older full-suite requirements in repository
  instructions, skills, generated snapshots and handoffs. Report broader release
  checks as deferred; do not silently execute them or claim they passed.
- Default small-fix budget: 20 discovered cases per batch and 180 seconds total.
  Unity: one explicit test-name/fixture filter and one mode, 60 seconds EditMode
  or 120 seconds PlayMode. Other runners: 60 seconds per focused batch by default.
  Split larger fixtures; inspect unknown-cost tests before execution.
- No unfiltered, assembly-wide, benchmark, stress, soak, multi-seed or long
  simulation runs in the owner's working session. Heavy/full verification needs
  an explicitly scheduled session outside the owner's working Editor.
- Verify the runner accepted the exact mode/filter and produced non-zero results.
  A fixture name is not a cost guarantee. Do not bypass a guard using raw CLI,
  another runner, eval, or a ScheduledHeavyRun flag without that scheduled scope.
- Only one test operation may be active. On timeout, lost responsiveness or
  missing progress, attempt cancellation once and one bounded status/log check,
  then stop with INDETERMINATE. Do not launch another run or poll indefinitely.
  A client timeout does not stop an in-process test. Never kill/restart the
  owner's Editor or discard work without explicit consent.
- Documentation-only instruction changes need static checks, not Unity tests.
  UI verification must exercise event wiring and resulting state; invoking a
  callback or injecting preferences alone is not proof of actual interaction.

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
