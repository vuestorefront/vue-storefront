## Why

The Vue 2.7 upgrade intentionally introduced current-instance helpers as a compatibility bridge, but production code still obtains application services, template refs, request data, and extension points through Vue component instances, `$root`, and `Vue.prototype`. Replacing those temporary and Vue-global access paths now establishes Vue 3-shaped boundaries while the storefront remains on the verified Vue 2.7 baseline.

## What Changes

- Add project-owned, typed application-service composables for the Vuex store, router, reactive route, and translation function, backed by application-level providers.
- **BREAKING**: Remove `useRootInstance()` and service-locator uses of `useCurrentInstance()` after all production consumers migrate to injected services, explicit refs, or request helpers.
- Replace current-instance `$refs` access with setup refs and explicit typed contracts for static, dynamic, `v-for`, and nested form refs.
- Replace component `$ssrContext` and `Vue.prototype.$ssrRequestContext` access with narrow per-application request services for host, cookies, user agent, and other confirmed component needs.
- Preserve Additional Content as a decoupled module extension point, but replace its Vue prototype/global-mixin/root-options transport with a typed, per-application content-outlet registry shared through normal module options and Vue injection.
- Remove `$bus` from Vue instances and replace the `new Vue()` event-bus implementation with a framework-independent facade that preserves the storefront's existing event and filter semantics.
- Remove unused or inactive Vue prototype service paths, including `$config`, the component-facing `$storyblokClient` assignment, and `$device`, without recreating them through Vue 3 global properties.
- Stop using the Vue root instance as a dependency bag in affected module initialization; pass the required application service through the existing module options.
- Add focused SSR, hydration, route-reactivity, form-ref, content-outlet, EventBus-compatibility, and provider-enforcement coverage across the parent repository and theme submodule.
- Keep the cross-layer `$cacheTags` redesign out of this change. A dependent follow-up will introduce a dedicated request-local collector for components, Vuex, services, resolvers, and mapping fallbacks.

## Capabilities

### New Capabilities

- `application-service-access`: Typed, fail-fast, Vue 3-shaped access to the store, router, reactive route, and translations without locating them through a Vue component instance.
- `explicit-template-reference-access`: Explicit and behaviorally verified setup-ref contracts for static, repeated, dynamic, and nested form references.
- `storefront-request-services`: Narrow, per-application request metadata access for components without exposing the renderer context or Vue prototype state.
- `additional-content-outlets`: Typed app-scoped outlets through which modules contribute renderable content without consumers depending on the contributing module.
- `framework-independent-event-bus`: An explicit EventBus facade with framework-neutral implementation and compatibility for existing events and filters.
- `vue-instance-extension-cleanup`: Removal and prevention of the scoped Vue root/prototype service extensions that are unsupported or strongly discouraged for Vue 3.

### Modified Capabilities

- `vue-2-7-runtime-compatibility`: Replace the temporary current-instance compatibility requirement with the permanent injected-service, explicit-ref, and request-service boundaries, then remove the compatibility helper.

## Impact

- Application bootstrap and shared infrastructure: `core/app.ts`, provider keys/adapters, request-service construction, route synchronization, module options, Vue compatibility plugins/types, and enforcement checks.
- Root modules and theme submodule: Composition API consumers currently using `useRootInstance()`, `useCurrentInstance()`, `$ssrContext`, `$refs`, `$additionalContent`, or `$bus`.
- Extension modules: TrueVault content contributions, EventBus clients, Storyblok client exposure, device/request prototype paths, and modules that currently retrieve affected services through the Vue app/root instance.
- Runtime behavior: Vuex actions, routing, localization, EventBus communication, content rendering, SSR output, hydration, form validation/focus behavior, authentication, customization, cart, and checkout behavior must remain compatible.
- Repository coordination: most component migrations are theme-owned, so the theme commit must be validated before the parent repository advances its submodule pointer.
- Follow-up dependency: `$cacheTags` remains temporarily documented and prohibited from new usage until the separate request-local cache-tag change removes it.
