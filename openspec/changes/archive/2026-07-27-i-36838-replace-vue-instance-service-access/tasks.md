## 1. Baseline and Characterization

- [x] 1.1 Record the parent commit, theme working-tree commit/gitlink, archived `i-36838-upgrade-vue-2-7` verification state, tool versions, and unrelated dirty-worktree paths that must be preserved.
- [x] 1.2 Refresh and record the production inventory for `useRootInstance()`, `useCurrentInstance()`, `$root`, scoped `$refs`, component `$ssrContext`, `$additionalContent`, `$bus`, `$extendedHead`, and the audited Vue prototype/type extensions across parent and theme repositories.
- [x] 1.3 Record the complete `$cacheTags` and `$ssrContext.output.cacheTags` exception inventory for the dependent cache-tag change and add a no-new-usage baseline.
- [x] 1.4 Add characterization tests for EventBus `$on`, `$off`, `$once`, `$emit`, listener ordering, argument forwarding, and return behavior used by the storefront.
- [x] 1.5 Add characterization tests for `$filter` and `$emitFilter`, covering ordinary-event emission, scalar versus argument-array input, asynchronous filters, result ordering, and rejection behavior.
- [x] 1.6 Add characterization coverage for existing Additional Content outlet order and rendered TrueVault components with the module enabled and disabled.
- [x] 1.7 Add focused behavioral coverage for representative static, conditional, `v-for`, dynamic-anchor, and nested-validation refs before changing the ref access mechanism.
- [x] 1.8 Add focused SSR fixtures for host, user-agent, cookie, canonical-URL, redirect, head-extension, and consecutive-request isolation behavior.

## 2. Application Service Foundation

- [x] 2.1 Create a core-owned application-service package with typed injection keys and a reusable `injectRequired()` helper that reports the missing service.
- [x] 2.2 Add project-owned `useStore()`, `useRouter()`, and narrow `useI18n()` adapters typed against the current Vuex 3, Vue Router 3, and vue-i18n 8 instances.
- [x] 2.3 Implement a shallow reactive route view initialized from `router.currentRoute` and updated after every completed navigation.
- [x] 2.4 Add `useRoute()` over the route-view provider and cover push, replace, query, params, redirects, and matched-record changes with focused tests.
- [x] 2.5 Update `createApp()` to provide the store, router, route view, and translation adapter to every client and SSR component tree.
- [x] 2.6 Add test-mount helpers/providers for unit tests and prove that each application-service composable fails descriptively when its provider is missing.
- [x] 2.7 Verify that the application-service adapters contain no eager or lazy `useRootInstance()`/`useCurrentInstance()` fallback and do not import the installed Router 3 composables.

## 3. Explicit Module and Head Services

- [x] 3.1 Define typed application services on the existing `StorefrontModule` options without adding a second module lifecycle or a TrueVault-specific initializer.
- [x] 3.2 Construct the module-service values in `createApp()` and pass the exact app-scoped services through normal client/theme module registration.
- [x] 3.3 Make the head-extension manager an explicit service and return value of `createApp()` instead of assigning and retrieving `app.$extendedHead`.
- [x] 3.4 Update the server entrypoint to consume the explicitly returned head manager and preserve template head injection.
- [x] 3.5 Update Fera to use the explicit head service and retain its configured script and rating-component behavior.

## 4. Additional Content Outlets

- [x] 4.1 Define typed semantic outlet identifiers and a framework-migration-safe renderable entry contract with namespaced stable keys.
- [x] 4.2 Implement an app-scoped shallow/reactive `AdditionalContentRegistry` with readonly consumption, deterministic append order, and descriptive duplicate-key rejection.
- [x] 4.3 Add `useAdditionalContent(outlet)` and unit tests for missing provider, empty outlets, multiple contributors, duplicate keys, readonly results, and late registration.
- [x] 4.4 Create and provide one registry per `createApp()` and pass that same instance through the existing module services.
- [x] 4.5 Update TrueVault to use the explicit head service and register its privacy-policy, footer, and financial-incentive components through the registry.
- [x] 4.6 Migrate root-module Additional Content consumers to named outlet composables without importing TrueVault.
- [x] 4.7 Migrate all theme Additional Content consumers to named outlet composables while preserving keyed rendering and existing layout.
- [x] 4.8 Remove the Additional Content Vue plugin installation, global mixin, root `additionalContent` option, private root fields, and obsolete Vue/options type augmentations.
- [x] 4.9 Add SSR and hydration tests proving enabled/disabled output parity, deterministic multi-contributor rendering, late reactive updates, and isolation between two application registries.

## 5. Framework-Independent EventBus

- [x] 5.1 Implement the project EventBus listener facade without constructing or importing Vue and make the characterization tests for `$on`, `$off`, `$once`, and `$emit` pass unchanged.
- [x] 5.2 Implement `$filter` and `$emitFilter` on the same facade and make the filter characterization tests pass unchanged.
- [x] 5.3 Preserve the existing EventBus import path and TypeScript/JavaScript consumer compatibility without introducing a new external event-emitter dependency unless tests prove it necessary.
- [x] 5.4 Migrate root/core `this.$bus`, `root.$bus`, and equivalent component-instance consumers to explicit EventBus imports.
- [x] 5.5 Migrate all theme `$bus` consumers to explicit EventBus imports while preserving listener cleanup hooks.
- [x] 5.6 Remove the EventBus Vue plugin, `$bus` prototype getter, and related Vue type augmentation.
- [x] 5.7 Run focused authentication, logout-clearing, customization, cart, checkout, and payment event tests to verify existing event names and side effects.

## 6. Store, Router, Route, and Translation Consumer Migration

- [x] 6.1 Migrate root/core `useRootInstance()` consumers to the exact project store/router/route/i18n adapters they use, preserving Vuex operation names and payloads.
- [x] 6.2 Migrate theme shared-layout, authorization, account, and order consumers and verify route restoration plus logged-in/logged-out behavior.
- [x] 6.3 Migrate theme catalog, product, Storyblok, and navigation consumers and verify route reactivity, canonical links, and content navigation.
- [x] 6.4 Migrate customization-system and cart consumers in reviewable domain groups without altering pricing, persistence, upload, or Vuex action flow.
- [x] 6.5 Migrate checkout, address, gift-card, and payment consumers without changing validation, totals, routing, or TaskQueue-backed operations.
- [x] 6.6 Update affected unit-test bootstraps and fixtures to provide the required application services instead of mocking a root Vue instance.
- [x] 6.7 Run an inventory check proving that no migrated consumer retrieves store, router, route, or translations through `useRootInstance()`, `useCurrentInstance()`, or `$root`.

## 7. Explicit Template Ref Migration

- [x] 7.1 Replace simple root-module current-instance `$refs` reads with typed setup-owned refs and preserve conditional mount/unmount behavior.
- [x] 7.2 Replace `o-base-address-form` state/phone validator lookup with explicit validator refs and focused validation tests.
- [x] 7.3 Refactor the shared form-validation helper to accept explicit child validation/focus handles rather than a complete parent `$refs` map.
- [x] 7.4 Migrate repeated customization-option refs to typed setup-owned `v-for` ref collections and verify mount, reorder, and teardown behavior.
- [x] 7.5 Replace dynamic validation-anchor indexing with stable setup refs plus explicit field-to-anchor mappings.
- [x] 7.6 Migrate the remaining theme current-instance/root `$refs` consumers in focused form groups and preserve first-error scrolling and focus.
- [x] 7.7 Run the static, conditional, repeated, dynamic, and nested-form characterization suites and confirm Vue 2.7 teardown cleanup remains intact.

## 8. Narrow Request Service Migration

- [x] 8.1 Define the narrow request-service contract and create server/client implementations for host, user agent, named-cookie lookup, and optional server redirect.
- [x] 8.2 Construct one request service per `createApp()` from the current SSR context or guarded browser APIs and provide it to components and affected module options.
- [x] 8.3 Refactor canonical-URL, cookie, and URL/link helpers to accept narrow host/cookie/redirect inputs instead of the complete renderer context.
- [x] 8.4 Migrate Composition API host and organization-schema consumers from `useCurrentInstance().$ssrContext` to request-service helpers.
- [x] 8.5 Migrate Options API product, category, Storyblok, and RouterLink metadata consumers without broad Options API conversion.
- [x] 8.6 Update AB-testing module/composables and customization forms to obtain the test-group cookie through the explicit request service.
- [x] 8.7 Preserve explicit context in mapping/async-data/server boundaries and replace component-level redirect access with only the narrow redirect operation where required.
- [x] 8.8 Remove `$ssrRequestContext` bootstrap assignment and active type augmentation; remove the inactive device prototype/module path rather than replacing it with a global property.
- [x] 8.9 Verify that cache-tag-only component and non-component call sites remain exactly on the recorded dependent-change inventory and that no cache-tag field was added to the request service.
- [x] 8.10 Run consecutive and concurrent SSR request-service tests with distinct hosts, cookies, user agents, redirects, canonical URLs, and AB assignments.

## 9. Remaining Vue Instance Extension Cleanup

- [x] 9.1 Remove the unused `$config` compatibility plugin and its Vue type declarations after confirming there are no production consumers.
- [x] 9.2 Remove the component-facing `Vue.prototype.$storyblokClient` assignment and its type declaration while preserving any separately scoped Vuex dependency still required by Storyblok actions.
- [x] 9.3 Remove `app.$extendedHead` declarations and all affected app-instance lookups after the explicit head service is in use.
- [x] 9.4 Delete `useRootInstance()` and `useCurrentInstance()` plus their compatibility tests after all in-scope service, ref, and request consumers migrate.
- [x] 9.5 Remove obsolete imports, barrels, private-instance interfaces, plugin exports/installations, and Vue module augmentations associated with the deleted access paths.
- [x] 9.6 Add a repository enforcement gate that reports new production uses of removed helpers, scoped `$root` lookups, and the removed prototype/private fields across parent and theme code.
- [x] 9.7 Configure the enforcement gate to recognize only the recorded `$cacheTags` temporary exception and fail if that exception inventory grows.
- [x] 9.8 Update active engineering and code-review guidance to use the project adapters, explicit refs, narrow request services, explicit EventBus import, and Additional Content outlets.

## 10. Static, Unit, and Build Validation

- [x] 10.1 Run immutable dependency installation and dependency-diff checks, confirming that this change did not introduce an unplanned framework or event-emitter package.
- [x] 10.2 Run `yarn type-check` for the exact combined parent/theme state and resolve errors without broad suppression or Vue-instance compatibility shims.
- [x] 10.3 Run lint and the new prohibited-access enforcement gate across parent and theme production code.
- [x] 10.4 Run maintained unit tests plus focused application-service, route, ref, request, Additional Content, EventBus, head, and isolation suites.
- [x] 10.5 Run `yarn generate-files`, client build, server build, service-worker build, and the complete clean build; inspect logs for SSR globals, hydration, duplicate listener, and missing-provider warnings.
- [x] 10.6 Run strict OpenSpec validation and parent/theme `git diff --check`, and review the final diff for accidental cache-tag, module-lifecycle, Vuex-domain, or unrelated modernization work.

## 11. Runtime Acceptance

- [x] 11.1 Start the production-like SSR application and verify health plus representative public, Storyblok, category, product, and structured-data renders.
- [x] 11.2 Render consecutive and concurrent applications with different route, host, cookie, request, head, and Additional Content values and prove isolation.
- [x] 11.3 Hydrate representative public/content/product routes and require a clean console with reactive navigation after hydration.
- [x] 11.4 Exercise static, repeated, dynamic, and nested form validation, including first-error scroll/focus and conditional field teardown.
- [x] 11.5 Exercise a full customization and cart flow, including upload, pricing, add/edit cart, coupon, and detailed-cart behavior.
- [x] 11.6 Exercise login, post-auth route restoration, account/order access, logout, and mandatory EventBus-driven feature-state clearing.
- [x] 11.7 Exercise guest/authenticated checkout, address forms, gift cards, and enabled payment entrypoints, confirming existing Vuex/TaskQueue and EventBus behavior.
- [x] 11.8 Compare SSR output, hydration behavior, conversion-critical events, and error monitoring with the archived Vue 2.7 baseline.

## 12. Repository Coordination and Follow-up

- [x] 12.1 Land the theme-owned migration as a dedicated reviewed commit and run its relevant CI/validation against the parent integration state.
- [x] 12.2 Update the parent theme gitlink to the exact validated theme commit and run the complete combined validation and runtime acceptance matrix.
- [x] 12.3 Record coordinated parent/theme rollback revisions and require client and SSR artifacts to roll back together.
- [x] 12.4 Create or link the dependent request-local cache-tag OpenSpec change with the recorded component, Vuex, resolver, service, getter, and mapping-fallback inventory.
- [x] 12.5 Confirm the candidate satisfies every capability scenario and archive this change only after the scoped prototype/current-instance access is removed and the cache-tag exception is explicitly linked.
