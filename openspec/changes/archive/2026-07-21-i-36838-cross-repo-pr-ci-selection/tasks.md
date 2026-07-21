## 1. Resolver

- [x] 1.1 Add a dependency-free, testable resolver that parses task-prefixed PR branches, discovers submodule branches and open PRs, and applies the default, relevant, and ambiguous-selection rules.
- [x] 1.2 Add focused resolver tests for default fallbacks, task-specific payment selection, ambiguous payment failures, and relevant-theme matrix filtering.

## 2. Workflow integration

- [x] 2.1 Update the CI resolver job to use pull-request discovery outputs while retaining static push-event mappings.
- [x] 2.2 Consume the resolved payment branch and theme matrix in all submodule checkouts and cache keys.

## 3. Verification

- [x] 3.1 Run the resolver tests and workflow configuration checks.
- [x] 3.2 Review the workflow diff and record the completed tasks.
