## MODIFIED Requirements

### Requirement: Explicit component-instance compatibility
Composition API code SHALL obtain application services through typed project-owned providers, template refs through explicit setup bindings, and request metadata through narrow request services, and MUST NOT depend on plugin-only `SetupContext` fields or the temporary current-instance compatibility helpers.

#### Scenario: Root services are used during setup
- **WHEN** a composable needs the current store, router, reactive route, or translations during component setup
- **THEN** it obtains the dependency through the corresponding project-owned injected adapter and preserves the existing operation

#### Scenario: Component refs are used during setup
- **WHEN** a form or component needs template refs from Composition API code
- **THEN** it uses setup-owned typed refs or an explicit nested-form contract without reading a current public instance's `$refs`

#### Scenario: SSR request context is used
- **WHEN** server rendering requires the host, user agent, cookie, or narrow redirect operation
- **THEN** the code obtains it from the request service created for that application and does not share request data across renders

#### Scenario: Helper is called without a current component
- **WHEN** an application-service or request-service composable is invoked without its required provider
- **THEN** it fails immediately with a descriptive error instead of locating a fallback Vue instance

### Requirement: Composition API behavior compatibility
The upgrade SHALL preserve the observable behavior of the Vue 2 Composition API features used by the storefront while removing plugin-specific extensions, except that native Vue 2.7 SHALL clear standard setup template refs during teardown instead of preserving the Vue 2.6 plugin's stale reference, and MUST NOT replace still-required Vue 2 reactivity operations with direct JavaScript mutation.

#### Scenario: Reactive properties are inserted or deleted
- **WHEN** existing customization or cart state uses `set` or `del` imported from `vue`
- **THEN** dependent computed values, watchers, and rendered output update as they did with the Vue 2.6 plugin

#### Scenario: Watcher-driven state changes
- **WHEN** representative default, immediate, and deep watchers respond to customization, address, upload, currency, authentication, or cart-option state
- **THEN** they produce the same observable state transitions without missed or duplicate callbacks

#### Scenario: Standard setup template ref is mounted and removed
- **WHEN** a component returns a `ref(null)` binding that matches a string ref in its template
- **THEN** native Vue 2.7 assigns the mounted public instance or element and clears it during teardown without a compatibility shim preserving a stale reference

#### Scenario: Server prefetch runs for an SSR request
- **WHEN** a component's `onServerPrefetch` hook reads request-local metadata through the narrow request-service boundary
- **THEN** the hook completes before server-rendered output is produced and its request data does not leak to another render

#### Scenario: Unused plugin differences are reviewed
- **WHEN** the final application-service adapters and migrated imports are inspected
- **THEN** they do not add shims for unused plugin `createApp`, `h`, readonly, reactivity-debugging, function-ref, or JSX behavior
