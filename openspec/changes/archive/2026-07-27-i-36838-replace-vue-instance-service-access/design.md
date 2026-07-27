## Context

The archived `i-36838-upgrade-vue-2-7` change moved the storefront to Vue 2.7.16 and deliberately replaced plugin-only `SetupContext.root`, `refs`, and `ssrContext` fields with `useRootInstance()` and `useCurrentInstance()` compatibility helpers. Those helpers made the framework upgrade safe, but they retained the older dependency-access model: Composition API code locates store, router, route, translations, refs, and request data through a Vue public instance.

The current production tree has broad `useRootInstance()` usage across root modules and the `petsies-capybara` theme. It also contains custom Vue extensions for Additional Content, EventBus, request data, cache tags, configuration, Storyblok, and device detection. The Additional Content plugin uses `Vue.prototype`, a global mixin, private component fields, and root options. The EventBus is itself a `new Vue()` instance and is additionally exposed as `$bus`.

The application is fully SSR-rendered. Each application creation must receive the correct router, route, request metadata, content contributions, and head extensions without sharing application-specific data. The current Vue 2 bundle renderer evaluates the server bundle in a fresh VM context by default, but the new boundaries must not rely on Vue component internals or on recreating Vue globals in Vue 3.

Most affected components are owned by the theme git submodule. Bootstrap, compatibility plugins, module registration, renderer entrypoints, and shared types are parent-repository concerns. The migration must therefore be staged and validated across both repositories.

Cache tags are a related but materially different dependency. Their writers cross components, Vuex, data resolvers, services, getters, and mapping fallbacks. This design does not create a partial cache-tag abstraction; the existing cache-tag path remains a documented exception until a dependent request-local collector change replaces it end to end.

## Goals / Non-Goals

**Goals:**

- Give Composition API code typed, fail-fast access to the current store, router, reactive route, and translation function without a Vue public/root instance.
- Replace current-instance ref access with explicit setup refs and typed nested-form contracts while preserving validation, focus, scrolling, and repeated-field behavior.
- Give components narrow request metadata and redirect capabilities without exposing the renderer/Express context.
- Preserve Additional Content as a decoupled module extension point through a typed, per-application registry.
- Preserve the established EventBus contract while removing both its Vue-instance implementation and `$bus` prototype access.
- Remove the scoped unused/inactive Vue prototype extensions and the temporary current-instance helpers.
- Keep application-specific providers and registries isolated across SSR application creation and hydration-compatible between server and client.
- Keep consumer call sites stable enough that Vue 3 later changes provider implementations rather than feature code.

**Non-Goals:**

- Upgrade to Vue 3, Vuex 4, Vue Router 4, vue-i18n 9, Pinia, Vite, or a different SSR renderer.
- Refactor every Options API use of plugin-supported `$store`, `$router`, `$route`, or `$t`.
- Replace Vuex string getters/actions with domain facades as part of the mechanical migration.
- Remove EventBus-based inter-module communication or rename existing events.
- Redesign the general `core/lib/modules.ts` lifecycle or rely on a TrueVault-specific initialization path.
- Replace cache-tag access, change cache invalidation semantics, or introduce a partial cache-tag adapter.
- Perform broad mixin, filter, global-component, `<script setup>`, or Options API cleanup.
- Redesign explicit server/async-data context parameters where they already form a clear non-component boundary.

## Decisions

### Provide project-owned application-service adapters

Create a core-owned application-service package containing typed `InjectionKey` values, one `injectRequired()` helper, and project composables for store, router, route, and translations. `createApp()` will provide the current Vuex store, router proxy, reactive route view, and a narrow bound translation adapter at the root.

`useStore()`, `useRouter()`, `useRoute()`, and `useI18n()` are project APIs. They must not import Router 4, Vuex 4, or a newer vue-i18n Composition API while the application remains on the current packages. On Vue 3, their provider implementations can change without modifying feature consumers.

Missing injection is a programming/bootstrap error. Each composable will fail immediately with a descriptive provider name. There will be no `useRootInstance()` fallback, because a fallback would keep the deprecated dependency alive and make incomplete test or application bootstraps appear valid.

Alternative considered: import the Vue Router 3 composables. Its installed `useRouter()` and `useRoute()` implementations locate `proxy.$root`, so they preserve the exact dependency this change removes.

Alternative considered: inject one untyped application object. This would recreate the service locator under a different name and allow consumers to depend on unrelated renderer and module internals.

### Maintain a project-owned reactive route view

Vue Router 3 does not expose the Vue Router 4 reactive route contract needed by future-facing consumers. Application bootstrap will create a shallow reactive route view initialized from `router.currentRoute` and update it from `router.afterEach`. `useRoute()` returns the stable reactive view; `useRouter()` returns the router itself.

The update replaces route fields such as params, query, matched records, path, and name so watchers and computed values respond after push, replace, redirects, and browser navigation. Focused tests will cover both direct navigation and reads from existing composables.

Alternative considered: return `router.currentRoute` directly. It does not provide a stable project-owned reactive object whose behavior remains the same when Router 4 replaces Router 3.

### Migrate service consumers mechanically before introducing domain facades

Each `useRootInstance()` consumer will be classified by the services it reads and migrated to only those project composables. Existing Vuex getter, dispatch, commit, router navigation, and translation behavior remains unchanged.

This change may use narrower existing domain composables where they already exist, but it will not create a large parallel domain-facade layer merely to hide every Vuex string. Separating dependency access from domain redesign keeps regressions attributable and the theme diff reviewable.

### Replace public-instance refs with explicit setup contracts

Static template refs will use returned Vue `ref()` bindings with explicit public-instance or element types. String refs under `v-for` will bind to setup-owned arrays supported by Vue 2.7. Dynamic anchors will use stable setup ref names plus an explicit field/anchor mapping instead of indexing the complete component `$refs` object.

The shared form-validation helper will accept the exact child validation components or field handles it needs. It will not accept a parent component's whole `$refs` map or inspect arbitrary child private refs. Where multiple form components need the same operations, a small typed form-field contract may expose validation, focus, or anchor behavior.

Alternative considered: retain `useCurrentInstance().$refs` for complex forms. That would make the most regression-sensitive forms the final consumers of a Vue-internal compatibility helper and defer the same work to the Vue 3 migration.

### Provide narrow request services, not the raw renderer context

Application bootstrap will construct a per-application request service from the SSR context or guarded browser APIs. The service exposes only confirmed component needs:

- request host;
- user agent;
- cookie lookup;
- a narrow server redirect operation where a component/server-prefetch path currently needs it.

Canonical URL and cookie helpers will accept these narrow values/operations rather than the complete SSR context. AB-testing customization filters will obtain the relevant cookie through the request service. Existing resolver, mapping, or `asyncData` code that already receives an explicit context may retain that explicit parameter.

Client implementations read `window.location`, `navigator`, and `document.cookie` only behind browser guards. Server implementations close over the current render context. No component receives Express request/response objects or the renderer `Context` type.

Cache-tag access is deliberately absent. The cache-tag-only `$ssrContext` call sites and `Vue.prototype.$cacheTags` remain assigned to the dependent cache-tag change; this change must neither increase their use nor route them through a temporary generic request object.

Alternative considered: provide the entire SSR context. This would rename `$ssrContext` without reducing coupling and would expose response mutation, output caching, and server internals to every component.

### Model Additional Content as typed app-scoped outlets

Create one `AdditionalContentRegistry` for each `createApp()` call. The same registry is:

- provided to the component tree through a typed injection key; and
- passed to modules through the existing `StorefrontModule` options, preferably under a typed `services` property.

This is an extension of the existing module options, not a second
initialization context or a TrueVault-specific lifecycle. Module registration
retains its existing process-wide guard by default for one-time store and Vue
setup. Modules that contribute through app-scoped services use an explicit
application registration scope, guarded by the application instance, so they
run once for every `createApp()` call. TrueVault, Fera, and A/B assignment use
that scope; Fera's Vue mixin remains protected by its existing one-time guard
inside the module while its head contribution is repeated for each app.

Outlets use semantic project-owned identifiers for privacy-policy links, footer links, and financial-incentive links. Entries have a stable, namespaced key and a renderable component contract. Registration appends entries in deterministic registration order. Duplicate keys within one outlet fail descriptively rather than silently replacing another module's contribution. Component definitions are stored shallowly or marked raw so Vue does not recursively observe them.

Consumers call `useAdditionalContent(outlet)` and receive a readonly reactive list. They know the outlet contract but not TrueVault. TrueVault receives the registry through normal module options and registers its components; it does not mutate `app.$root.$options`. Contributions made before render are identical on server and client, while reactivity preserves the extension point if an enabled module contributes later.

The head-extension manager used by TrueVault and Fera will also be passed explicitly through affected module options and returned explicitly from `createApp()` to the server entrypoint, rather than being discovered as `app.$extendedHead`.

Alternative considered: import TrueVault components directly into every form. This reverses the intended dependency direction and couples generic forms to a privacy provider.

Alternative considered: use a process-global registry. That can leak enabled/configured contributions across SSR applications and prevents deterministic test isolation.

### Preserve EventBus through an explicit framework-independent facade

The existing EventBus import path remains the shared inter-module facade, minimizing churn for files that already import it explicitly. Its implementation will use project-owned listener/filter collections rather than `new Vue()`, and the Vue plugin exposing `$bus` will be removed.

The facade preserves:

- `$on`, `$off`, `$once`, and `$emit`;
- removal of all listeners, all listeners for one event, or one callback;
- once-listener removal through the original callback;
- listener invocation order and argument forwarding;
- reporting synchronous throws and asynchronous rejections without aborting later listeners;
- `$filter` registration;
- `$emitFilter` emitting the ordinary event first even when an ordinary listener fails, passing a scalar for one argument or an argument array for multiple arguments, invoking all registered filters, and resolving `Promise.all` results.

Options API and Composition API consumers currently using `this.$bus` or `root.$bus` will import the facade explicitly. This change does not alter event names, authentication events, checkout events, or module boundaries.

Alternative considered: replace EventBus communication with direct module imports or Vuex actions. That conflicts with the storefront's established inter-module contract and would mix domain redesign into framework preparation.

### Remove scoped Vue extensions instead of moving them to globalProperties

After consumers migrate:

- remove the Additional Content plugin, mixin, root option, and type augmentations;
- remove the EventBus Vue plugin and `$bus` type;
- remove the unused `$config` prototype plugin;
- remove the component-facing `$storyblokClient` prototype assignment while leaving any separately scoped Vuex-side dependency for a future service refactor unless safe removal requires changing it;
- remove the inactive device and `$ssrRequestContext` prototype path;
- remove `app.$extendedHead` in favor of the explicit head service;
- delete `useRootInstance()` and `useCurrentInstance()` once no non-cache-tag production consumer remains.

`Vue.prototype.$cacheTags` is the sole explicit temporary exception owned by the dependent change. Existing Vue Storefront compatibility globals unrelated to the audited service-locator scope are not implicitly included.

Static enforcement will reject new production imports of the removed helpers and new uses of the scoped prototype/root fields. Tests and fixtures may reference removed names only when proving the enforcement rule itself.

Alternative considered: move the properties to `app.config.globalProperties` during Vue 3 migration. That would preserve global hidden dependencies and request-isolation risks under a new API.

### Validate behavior at the access and commerce boundaries

Unit tests will prove provider failures, route reactivity, request isolation, Additional Content composition, EventBus compatibility, and each ref shape. SSR/hydration tests will render at least two application contexts with different request metadata and content contributions.

The complete maintained quality gates and representative public, Storyblok, product, customization, cart, authentication, account, checkout, and payment flows remain release requirements. Theme and parent changes will be committed and reviewed separately, with the theme revision landing before the parent gitlink update.

## Risks / Trade-offs

- [A root consumer is missed] → Search production and test code for helper imports, `$root`, `$ssrContext`, scoped prototype properties, and module type augmentations; make the enforcement check a required gate.
- [The route mirror becomes stale or loses a route field] → Update from every `afterEach` navigation and cover push, replace, query/param changes, redirects, and watchers in focused tests.
- [Ref migration changes validation order, focus, or scrolling] → Classify static, repeated, dynamic, and nested refs separately and exercise representative forms instead of applying one mechanical rewrite.
- [Request data leaks between renders] → Construct request services and registries inside `createApp()` and test consecutive and concurrent applications with distinct hosts, cookies, user agents, redirects, and content.
- [Additional Content modules overwrite or reorder one another] → Use keyed append-only registration with deterministic order, duplicate-key failure, readonly consumer lists, and multi-contributor tests.
- [Vue observes component constructors stored in the registry] → Use shallow reactive storage or raw component values and verify SSR/client rendering.
- [The new EventBus differs subtly from Vue event semantics] → Freeze the current `$on`/`$off`/`$once`/`$emit` and filter behaviors in characterization tests before replacing the implementation.
- [Cache-tag work is accidentally split across two abstractions] → Keep cache tags out of request services, list their remaining call sites explicitly, and require a separate end-to-end request-local collector change.
- [The broad theme diff obscures behavior changes] → Land providers and characterization tests first, migrate by domain and access shape, and review mechanical consumer changes separately from infrastructure.
- [Parent and theme revisions become incompatible] → Validate the exact combined revisions, land the theme commit first, and advance the parent gitlink only after the theme gates pass.

## Migration Plan

1. Capture the archived Vue 2.7 baseline, current locator inventory, existing cache-tag exception list, and parent/theme revisions.
2. Add characterization tests for current route changes, ref-heavy forms, Additional Content output, EventBus/filter semantics, request metadata, SSR isolation, and representative commerce flows.
3. Add application-service keys/adapters, the route view, request services, head service, and root providers without migrating consumers.
4. Add the Additional Content registry and framework-independent EventBus facade; adapt TrueVault, Fera, and affected module options while preserving output and event behavior.
5. Migrate root-repository consumers by service/access shape, then migrate theme consumers by domain. Keep ref-heavy forms in focused reviewable groups.
6. Remove the Additional Content/EventBus/config/device/request/head Vue extensions, obsolete type augmentations, and current-instance helpers after searches show no in-scope consumer.
7. Add enforcement and run type-check, lint, maintained unit tests, focused SSR/hydration tests, client/server/service-worker builds, and the complete runtime acceptance matrix.
8. Commit and validate the theme changes, then update the parent submodule pointer and validate the exact combined state.
9. Create or link the dependent cache-tag change and retain its temporary exception until that change removes all cache-tag prototype and `$ssrContext.output.cacheTags` access.

Rollback reverts the parent infrastructure/migrations together with the matching theme commit and gitlink. No persisted data migration is involved. Client and SSR artifacts must be rolled back to the same revision.

## Open Questions

- What issue identifier and sequencing should be used for the dependent request-local cache-tag change? This does not block implementation of the scoped access migration.
