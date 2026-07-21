## Why

Feature work can span the storefront, its theme, and the Braintree payment module. The current CI matrix is selected only from the storefront PR target branch, so it cannot test same-task changes in the two submodule repositories.

## What Changes

- Discover the task number from a pull request source branch and use it to find matching branch and pull-request context in the theme and payment repositories.
- Select a task-specific payment branch when its PR unambiguously identifies one; otherwise retain `optimuspro` as the fallback.
- Build a theme matrix from task-specific theme branches only when their open PR targets are relevant to the storefront PR; otherwise retain the appropriate default themes.
- Preserve the existing static branch selection for push events.
- Fail with actionable diagnostics when matching payment branches or PRs are ambiguous.

## Capabilities

### New Capabilities

- `cross-repository-pr-ci-selection`: Resolve pull-request CI submodule branches and the theme test matrix from same-task branches and pull-request metadata.

### Modified Capabilities

- None.

## Impact

- `.github/workflows/test_vsf1.yml` and a testable CI branch-resolution helper.
- Read-only GitHub API access to the public `BudsiesApp/vsf-capybara` and `BudsiesApp/vsf-payment-braintree` repositories.
- CI output, checkout branches, and cache keys for pull-request jobs.
