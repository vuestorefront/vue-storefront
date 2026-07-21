## Context

The workflow currently derives a static theme matrix from the storefront branch. A feature can instead have branches with the same task number in the storefront, theme, and payment repositories. CI needs to check out those related branches without changing the storefront PR checkout, which must remain GitHub's merge ref.

## Goals / Non-Goals

**Goals:**

- Derive a deterministic pull-request matrix and payment branch from same-task branch and PR metadata.
- Keep the branch discovery logic independently testable and make its decisions visible in the workflow log.
- Retain default branch behavior when a feature has no matching submodule work.

**Non-Goals:**

- Create, modify, merge, or close pull requests in the submodule repositories.
- Use secrets or a `pull_request_target` workflow.
- Change the static push-event matrix or theme package installation layout.

## Decisions

### Use one event-aware workflow

`test_vsf1.yml` will retain one set of test jobs. Its resolver will use static mappings for push events and delegate pull-request selection to a helper. This avoids duplicating setup, cache, lint, unit-test, and build definitions between workflows.

### Use a dependency-free Node resolver and GitHub's read-only REST API

A CommonJS helper under `.github/scripts/` will accept the PR head and base branches, read branch and pull-request metadata from the public submodule repositories without a token, and write a JSON matrix plus a payment branch to `GITHUB_OUTPUT`. The workflow grants only `contents: read` for its own checkout. The helper will use the standard `fetch` API, pagination, and injected request functions in tests; it will add no package dependency.

Using a helper instead of an inline shell script makes task-number parsing, ambiguity handling, and PR-target filtering unit-testable. Using the REST API instead of branch-name heuristics is necessary because only the corresponding theme PR base identifies the theme that branch changes.

### Resolve defaults and task-specific branches independently

The storefront PR base selects default themes: Petsies, Budsies, and Waggables for `petsies-theme`, and Bulkorders for `bulkorders-theme`. A PR with an unrecognized base uses all four defaults so CI still runs for every pull request.

The resolver extracts a numeric task prefix from the storefront PR head branch. It lists same-prefix branches in each submodule repository. Payment selection is deterministic: one matching open payment PR selects its source branch; no matching PR selects the only matching branch or `optimuspro`; multiple matching PRs, or multiple unmatched branches, stop the resolver with the competing names. Theme candidates are included only when their one open theme PR targets a default theme relevant to the storefront PR. If none qualify, the resolver returns the default theme branches rather than mixing in defaults.

### Preserve safe pull-request execution

The workflow continues using `pull_request`, not `pull_request_target`, and checks out the PR merge result. It consumes no deployment credentials or write-capable token. A fork PR can only exercise the repository's read-only discovery path.

## Risks / Trade-offs

- [GitHub API rate limiting or temporary failure] → Fail the resolver with the API response rather than silently testing a possibly incorrect branch set.
- [A task branch lacks an open submodule PR] → Treat a single payment branch as unambiguous; exclude theme branches without an open, relevant PR and use defaults.
- [Task-number conventions are not followed] → Log the missing prefix and use the default themes with `optimuspro`, preserving CI for every PR.
- [A nonstandard storefront target cannot identify a theme group] → Use all default theme branches and log that fallback.

## Migration Plan

1. Add unit-tested branch and PR resolution helper logic.
2. Wire its outputs into the resolver and each submodule checkout/cache key.
3. Validate workflow syntax and the pure resolver tests locally.
4. Roll back by reverting the workflow and helper together; static push mappings are unaffected.

## Open Questions

- None. Theme and payment PRs are intentionally restricted to open PRs so closed work cannot redirect current feature CI.
