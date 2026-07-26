## ADDED Requirements

### Requirement: App-scoped Additional Content registry
Each client and SSR application SHALL create one typed Additional Content registry and share that same registry with modules and descendant components without `Vue.prototype`, a global mixin, or root component options.

#### Scenario: Application initializes content outlets
- **WHEN** `createApp()` constructs an application
- **THEN** it provides a new empty registry to the component tree and passes it through the existing module options

#### Scenario: Two applications initialize independently
- **WHEN** two applications register different Additional Content entries
- **THEN** each application exposes only its own entries

### Requirement: Decoupled module contributions
Modules SHALL register renderable entries against semantic content outlets without consumers importing or identifying the contributing module.

#### Scenario: TrueVault is enabled
- **WHEN** TrueVault registers privacy-policy, footer, and financial-incentive entries
- **THEN** every consumer of those outlets can render the entries without a dependency on TrueVault

#### Scenario: Contributing module is disabled
- **WHEN** no enabled module contributes to an outlet
- **THEN** consumers receive an empty readonly list and render no additional content

### Requirement: Deterministic contribution composition
The registry SHALL combine contributions in deterministic registration order, preserve entry order within each registration, and require a unique stable key per outlet.

#### Scenario: Multiple modules contribute
- **WHEN** two modules register entries for the same outlet
- **THEN** consumers receive all entries in deterministic registration and entry order

#### Scenario: Duplicate key is registered
- **WHEN** a module registers a key already present in the same outlet
- **THEN** registration fails descriptively instead of silently overwriting or rendering a duplicate

### Requirement: Reactive readonly content consumption
Consumers SHALL receive readonly reactive outlet lists, and stored component definitions MUST remain suitable for Vue 2.7 SSR and client rendering without recursive observation.

#### Scenario: Contribution exists before initial render
- **WHEN** server and client initialize the same enabled modules
- **THEN** the outlet renders equivalent keyed component output and hydrates without mismatch warnings

#### Scenario: Contribution is registered after a consumer exists
- **WHEN** an enabled module contributes after the consumer has been created
- **THEN** the consumer updates to render the new entry without mutating the registry directly

### Requirement: Existing module lifecycle is retained
Additional Content contribution SHALL use the existing `StorefrontModule` setup path with an explicit registry dependency and MUST NOT introduce a TrueVault-only initializer or a separate application lifecycle.

#### Scenario: TrueVault contributes content
- **WHEN** the normal module setup invokes TrueVault
- **THEN** TrueVault uses the registry from its module options and does not access `app.$root.$options.additionalContent`
