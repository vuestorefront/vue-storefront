## ADDED Requirements

### Requirement: Pull-request task context
The CI resolver SHALL extract the leading numeric task identifier from the storefront pull-request source branch and SHALL use the pull-request target branch to determine default relevant themes.

#### Scenario: Task-prefixed Petsies pull request
- **WHEN** a storefront pull request has source branch `36838-ci-selection` and target branch `petsies-theme`
- **THEN** the resolver uses task identifier `36838` and default themes `petsies-theme`, `budsies-theme`, and `waggables-theme`

#### Scenario: Pull request has no task prefix
- **WHEN** a storefront pull request source branch does not begin with a numeric task identifier
- **THEN** the resolver logs the fallback and uses default themes with payment branch `optimuspro`

#### Scenario: Pull request targets an unrecognized branch
- **WHEN** a storefront pull request target is neither `petsies-theme` nor `bulkorders-theme`
- **THEN** the resolver uses all default theme branches and logs that it could not narrow the default group

### Requirement: Payment branch selection
The CI resolver SHALL select a same-task payment branch only when its branch and pull-request context is unambiguous; otherwise it SHALL use `optimuspro` or fail before test jobs start.

#### Scenario: One matching payment pull request
- **WHEN** exactly one open payment-repository pull request has a source branch beginning with the storefront task identifier
- **THEN** the resolver selects that pull request's source branch

#### Scenario: One matching payment branch without a pull request
- **WHEN** exactly one payment branch begins with the storefront task identifier and no matching open payment pull request exists
- **THEN** the resolver selects that branch

#### Scenario: No matching payment branch
- **WHEN** no payment branch begins with the storefront task identifier
- **THEN** the resolver selects `optimuspro`

#### Scenario: Ambiguous payment pull requests
- **WHEN** two or more open payment pull requests have source branches beginning with the storefront task identifier
- **THEN** the resolver fails and reports the competing pull requests and branches

#### Scenario: Ambiguous unassociated payment branches
- **WHEN** two or more payment branches begin with the storefront task identifier and none has an open pull request
- **THEN** the resolver fails and reports the competing branches

### Requirement: Theme matrix selection
The CI resolver SHALL include same-task theme branches only when their corresponding open theme pull requests target a theme relevant to the storefront pull request.

#### Scenario: Relevant task-specific theme branches exist
- **WHEN** one or more open theme pull requests with source branches beginning with the storefront task identifier target relevant themes
- **THEN** the resolver returns only those source branches in the test matrix

#### Scenario: Task-specific theme branch targets an irrelevant theme
- **WHEN** a same-task theme pull request targets a theme outside the storefront pull request's relevant default themes
- **THEN** the resolver excludes that theme branch from the matrix

#### Scenario: No relevant task-specific theme branch exists
- **WHEN** no same-task theme branch has a corresponding open pull request targeting a relevant theme
- **THEN** the resolver returns all default themes relevant to the storefront pull request

### Requirement: Branch resolution is used by CI jobs
The CI workflow SHALL use the resolver's payment branch and theme matrix for dependency preparation, linting, maintained unit tests, and builds of pull requests.

#### Scenario: Resolved payment and theme branches are checked out
- **WHEN** the resolver returns a payment branch and theme matrix entry
- **THEN** every corresponding matrix job checks out those branches before using cached dependencies or executing its command

#### Scenario: Push event preserves static behavior
- **WHEN** the workflow runs for a configured push branch
- **THEN** it uses the existing static payment and theme branch mapping without pull-request discovery
