# vue-2-7-runtime-compatibility Specification

## Purpose
TBD - created by archiving change i-36838-upgrade-vue-2-7. Update Purpose after archive.
## Requirements
### Requirement: Coherent Vue 2.7 dependency set
The storefront SHALL use exactly Vue 2.7.16 for the browser runtime, server renderer, and template compiler, and the installed workspace SHALL resolve one Vue runtime.

#### Scenario: Immutable dependency installation
- **WHEN** dependencies are installed from the committed root and theme manifests and lockfile
- **THEN** the install completes immutably with `vue`, `vue-server-renderer`, and `vue-template-compiler` at 2.7.16 and without a Vue peer-version conflict

#### Scenario: Vue resolution is inspected
- **WHEN** the installed dependency graph is queried for Vue requesters
- **THEN** every requester resolves to the single enforced Vue 2.7.16 package

### Requirement: Native Composition API
Application and test code SHALL use the Composition API exported by `vue` and MUST NOT install or import `@vue/composition-api`.

#### Scenario: Application bootstrap
- **WHEN** the client or SSR application is created
- **THEN** Composition API functions are available without a global Composition API plugin installation

#### Scenario: Unit-test bootstrap
- **WHEN** a Composition API component is mounted by the Vue 2 unit-test stack
- **THEN** the component mounts without installing `@vue/composition-api` on Vue or a local Vue constructor

### Requirement: Explicit component-instance compatibility
Composition API code SHALL access the Vue root instance, component refs, and SSR context through typed current-instance helpers and MUST NOT depend on plugin-only `SetupContext` fields.

#### Scenario: Root services are used during setup
- **WHEN** a composable needs the existing root store, router, route, translations, or component options during component setup
- **THEN** it obtains the current public Vue instance or its `$root` through the compatibility helper and preserves the existing operation

#### Scenario: Component refs are used during setup
- **WHEN** a form or component needs template refs from Composition API code
- **THEN** it reads the current public instance's `$refs` through the typed compatibility boundary

#### Scenario: SSR request context is used
- **WHEN** server rendering requires request headers or other `$ssrContext` data
- **THEN** the code obtains that context from the current public instance, remains guarded from browser execution, and does not share request data across renders

#### Scenario: Helper is called without a current component
- **WHEN** the current-instance helper is invoked outside valid component setup
- **THEN** it fails immediately with a descriptive error instead of returning an undefined or partially typed instance

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
- **THEN** the Vue 2.6 baseline records assignment plus the plugin's stale teardown reference, while native Vue 2.7 assigns the mounted public instance or element and clears it during teardown without a compatibility shim preserving the stale reference

#### Scenario: Server prefetch runs for an SSR request
- **WHEN** a component's `onServerPrefetch` hook reads request-local data through the typed current-instance boundary
- **THEN** the hook completes before server-rendered output is produced and its context does not leak to another request

#### Scenario: Unused plugin differences are reviewed
- **WHEN** the final compatibility layer and migrated imports are inspected
- **THEN** they do not add shims for unused plugin `createApp`, `h`, readonly, reactivity-debugging, function-ref, or JSX behavior

### Requirement: Vue 2.7 type integrity
The Vue 2.7 codebase SHALL pass the configured `vue-tsc` type-check without global suppressions introduced to hide framework-upgrade incompatibilities.

#### Scenario: Component templates are type-checked
- **WHEN** Options API, hybrid setup/Options API, and Composition API components are checked
- **THEN** their template methods, setup bindings, props, translated attributes, DOM attributes, refs, styles, component registries, and async loaders satisfy the Vue 2.7 types

#### Scenario: Upgrade configuration is inspected
- **WHEN** the TypeScript and Vue language-tool configuration is reviewed
- **THEN** `vueCompilerOptions.target` identifies Vue 2.7 and neither a target downgrade nor a broad `any` or fake setup-context augmentation masks errors

### Requirement: SSR and hydration parity
The storefront SHALL build and execute client and SSR artifacts from the same Vue 2.7.16 dependency state and SHALL preserve hydration-compatible output.

#### Scenario: Production artifacts are built
- **WHEN** the production build pipeline runs
- **THEN** the client bundle, Vue SSR server bundle, and service worker compile successfully from the same commit and lockfile

#### Scenario: Server-rendered page hydrates
- **WHEN** a representative server-rendered storefront page is loaded in a browser
- **THEN** Vue hydrates it without missing Composition API exports, duplicate Vue instances, hydration mismatch warnings, or client-only global access on the server

#### Scenario: Consecutive SSR requests are isolated
- **WHEN** two requests with different route, host, or authentication-independent render context are processed
- **THEN** the second render contains no request-specific state from the first render

### Requirement: Storefront behavior remains compatible
The upgrade SHALL preserve existing Vuex, routing, localization, authentication, Storyblok, customization, cart, order, checkout, and payment behavior.

#### Scenario: Public and content routes
- **WHEN** representative landing, Storyblok, category, and product pages render and hydrate
- **THEN** content, localized values, route navigation, structured data, and interactive controls behave as before the upgrade

#### Scenario: Customization and cart flow
- **WHEN** a guest configures a custom product, uses nested form refs, adds or edits the item, applies a coupon, and opens the detailed cart
- **THEN** setup-derived state, refs, Vuex actions, pricing, navigation, and notifications preserve their pre-upgrade behavior

#### Scenario: Authentication and customer flow
- **WHEN** a customer logs in, visits protected account/order routes, and logs out
- **THEN** route restoration and user-specific Vuex loading/clearing continue to follow the existing EventBus and `user/isLoggedIn` contracts without cross-session state leakage

#### Scenario: Checkout and payment flow
- **WHEN** a guest or authenticated customer completes the supported checkout and payment entry paths
- **THEN** components continue dispatching Vuex actions and TaskQueue work, totals and addresses remain correct, and payment integrations initialize without Composition API runtime errors

### Requirement: Upgrade validation and governance
The completed upgrade SHALL pass the repository's maintained quality gates and SHALL document the active Vue baseline and Vue 2 end-of-life status.

#### Scenario: Quality gates run
- **WHEN** the candidate combined parent/theme state is validated
- **THEN** immutable install, peer/de-duplication checks, type-check, lint, maintained unit tests, unchanged cross-version Composition API fixtures with the approved version-specific template-ref cleanup expectation, upgrade tests, client/server/service-worker builds, and targeted runtime smoke tests pass

#### Scenario: Engineering guidance is consulted
- **WHEN** a developer reads the active project and code-review instructions
- **THEN** they are told that the project uses Vue 2.7's native Composition API and are not directed to install or import the removed plugin

#### Scenario: Production approval is requested
- **WHEN** the Vue 2.7 candidate is proposed for production
- **THEN** the release record identifies Vue 2 as end-of-life and records the owner-approved risk treatment or selected extended-support arrangement

