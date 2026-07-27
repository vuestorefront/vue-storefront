# application-service-access Specification

## Purpose
TBD - created by archiving change i-36838-replace-vue-instance-service-access. Update Purpose after archive.
## Requirements
### Requirement: Typed application service providers
The storefront SHALL provide the current Vuex store, router, reactive route, and translation adapter through typed project-owned application-service keys for every client and SSR application.

#### Scenario: Application services are provided
- **WHEN** `createApp()` constructs a client or SSR application
- **THEN** descendants can obtain the exact store, router, reactive route view, and translation adapter associated with that application

#### Scenario: Provider is missing
- **WHEN** an application-service composable is invoked without its required provider
- **THEN** it fails immediately with a descriptive error identifying the missing service

### Requirement: Vue-instance-independent consumer access
Composition API consumers SHALL obtain application services through project-owned composables and MUST NOT locate them through `getCurrentInstance()`, a Vue public instance, `$root`, or a generic injected application object.

#### Scenario: Store operation is performed
- **WHEN** a migrated composable reads Vuex state/getters or invokes dispatch/commit
- **THEN** it uses the store returned by the project `useStore()` adapter and preserves the existing Vuex operation

#### Scenario: Navigation is performed
- **WHEN** a migrated composable pushes, replaces, or resolves a route
- **THEN** it uses the router returned by the project `useRouter()` adapter and preserves navigation behavior

#### Scenario: Text is translated
- **WHEN** a migrated composable translates user-facing text
- **THEN** it uses the narrow translation function returned by the project `useI18n()` adapter and preserves the current localized result

### Requirement: Reactive route view
The project `useRoute()` adapter SHALL return a stable reactive route view that reflects every completed Router 3 navigation.

#### Scenario: Route query or params change
- **WHEN** navigation changes route query, params, path, name, or matched records
- **THEN** computed values and watchers reading the injected route observe the new values without retrieving a Vue root instance

#### Scenario: Router implementation is later replaced
- **WHEN** the application provider changes from the Router 3 route mirror to a Vue 3-compatible router
- **THEN** feature consumers retain the same project `useRoute()` contract

### Requirement: Application service isolation
Application service providers SHALL bind values created for the current application and MUST NOT use a mutable process-global current-app reference.

#### Scenario: Two SSR applications are created
- **WHEN** two SSR applications use different routers or route values
- **THEN** each application's consumers observe only its own provided router and route

#### Scenario: App-scoped module contributors initialize
- **WHEN** consecutive applications are created in the same JavaScript module context
- **THEN** service-dependent module contributors receive each application's own head, request, and Additional Content services while global module setup remains registered once

