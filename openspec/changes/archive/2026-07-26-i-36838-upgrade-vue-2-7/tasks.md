## 1. Change setup and reproducible baseline

- [x] 1.1 Replace the temporary `i-0000-upgrade-vue-2-7` identifier with the assigned issue number before implementation or publication.
- [x] 1.2 Record the parent commit, theme-submodule commit, Node/Yarn versions, active branches, and unrelated worktree changes that must be preserved.
- [x] 1.3 Run `yarn install --immutable`, `yarn why vue`, `yarn why vue-server-renderer`, `yarn why vue-template-compiler`, `yarn dedupe --check`, and peer validation on the current Vue 2.6 state; save the expected pre-existing warnings separately from Vue-related warnings.
- [x] 1.4 Run and record the Vue 2.6 baseline for `yarn type-check`, `yarn lint`, `yarn test:unit:maintained --runInBand`, `yarn test:upgrade:config`, `yarn test:upgrade:type-check-watch`, and `yarn build`.
- [x] 1.5 Fix the five existing type-check failures in a separate preparatory commit: the two menu item `class` errors, two reminder-form content errors, and customization option-price error.
- [x] 1.6 Re-run the complete baseline and require a green Vue 2.6 type-check before beginning framework-compatibility edits.

## 2. Typed current-instance boundary and Vue 2.6 parity fixtures

- [x] 2.1 Add focused unit tests that mount a setup component and prove access to its current public instance, `$root`, `$refs`, and `$ssrContext`.
- [x] 2.2 Add a unit test proving that use outside valid component setup throws a descriptive error.
- [x] 2.3 Implement a focused shared composable under `src/modules/shared/composables/` using `getCurrentInstance()`, with typed current-public-instance and root-instance access that works under the Vue 2.6 plugin and native Vue 2.7.
- [x] 2.4 Export the helper through the shared module's established public exports so both root modules and the theme can consume one implementation.
- [x] 2.5 Add representative composable tests proving that store, router, translation, refs, and SSR-header behavior remains unchanged through the helper.
- [x] 2.6 Add Vue 2.6 behavioral fixtures for representative default, immediate, and deep watchers in customization, address reset, upload, currency/banner, authentication route-restoration, and cart-option flows.
- [x] 2.7 Add Vue 2.6 fixtures proving that `set`/`del` invalidate computed/rendered consumers and recording that returned `ref(null)` template bindings are assigned on mount but retained stale by the plugin on teardown; require native Vue 2.7 to clear them.
- [x] 2.8 Add a Vue 2.6 SSR fixture proving that `onServerPrefetch` completes before rendering and that request-local data obtained through the current-instance helper remains isolated between two renders.

## 3. Root compatibility migration while still on Vue 2.6

- [x] 3.1 Migrate plugin-only root-instance access in `core` and root composables to the shared current-instance helper.
- [x] 3.2 Migrate root-instance access in root feature components, grouping store/router/i18n behavior separately from unrelated component edits.
- [x] 3.3 Replace over-broad `SetupContext` parameters in root composables with `Pick<SetupContext, 'emit'>`, explicit callbacks, or direct helper access according to what each composable actually needs.
- [x] 3.4 Migrate root-owned component-ref and SSR-context access to the typed public-instance boundary.
- [x] 3.5 Remove the `@vue/composition-api` setup-context augmentation after root consumers no longer require it, so remaining plugin-only accesses become compile failures.
- [x] 3.6 Run root-focused unit tests, lint, and type-check on Vue 2.6 and fix only regressions caused by the compatibility migration.

## 4. Theme compatibility migration while still on Vue 2.6

- [x] 4.1 Migrate theme helpers and authentication/account/order/checkout pages from `context.root` or destructured `root` to the shared helper.
- [x] 4.2 Migrate Storyblok, promotion, cart, and general theme components from plugin-only root access while preserving Vuex, routing, i18n, and notification behavior.
- [x] 4.3 Migrate customization-system forms, widgets, and product pages from plugin-only root access without changing their domain logic.
- [x] 4.4 Replace the eight `context.refs` occurrences in eight theme files with typed `$refs` access and retain the existing nested-form-ref abstractions.
- [x] 4.5 Replace SSR-context access in the six affected theme files with typed `$ssrContext` access and retain server/browser guards.
- [x] 4.6 Narrow the remaining theme `SetupContext` parameters to the fields or callbacks they actually consume.
- [x] 4.7 Run theme-relevant unit tests, lint, and type-check on Vue 2.6 and fix only compatibility-migration regressions.

## 5. Vue 2.6 compatibility checkpoint

- [x] 5.1 Prove that no production or test file still accesses plugin-only `SetupContext.root`, `SetupContext.refs`, or `SetupContext.ssrContext`, including destructured aliases.
- [x] 5.2 Run the immutable install, de-duplication/peer checks, type-check, lint, maintained unit tests, both upgrade tests, and full production build on the combined Vue 2.6 state.
- [x] 5.3 Execute representative Vue 2.6 SSR renders and browser hydration for public, customization, cart, authentication, account/order, and checkout paths.
- [x] 5.4 Commit the root and theme compatibility changes in reviewable commits and record their exact SHAs as the framework-upgrade rollback checkpoint.
- [x] 5.5 Run and record the watcher, `set`/`del`, setup-template-ref, and `onServerPrefetch` compatibility fixtures under Vue 2.6; freeze those tests, including the approved version-specific template-ref teardown expectation, so only framework bootstrap changes during the Vue 2.7 switch.

## 6. Vue 2.7 dependency and API switch

- [x] 6.1 Pin root `vue`, `vue-server-renderer`, `vue-template-compiler`, Vue peer metadata, and the root Vue resolution to exact `2.7.16`.
- [x] 6.2 Pin the theme workspace's Vue provider to exact `2.7.16` and verify that the root resolution still installs only one runtime.
- [x] 6.3 Remove `@vue/composition-api` from the root manifest and remove its `Vue.use` installation from application bootstrap.
- [x] 6.4 Change all Composition API runtime and type imports in `core` and root modules from `@vue/composition-api` to `vue`.
- [x] 6.5 Change all Composition API runtime and type imports in the theme from `@vue/composition-api` to `vue`.
- [x] 6.6 Remove Composition API plugin installation from Banner and any other unit-test setup or local Vue constructors.
- [x] 6.7 Set `vueCompilerOptions.target` to Vue 2.7 and retain the current compatible `vue-loader`, PostCSS, ESLint, and Vue language-tool versions unless a failing gate proves another change is required.
- [x] 6.8 Regenerate `yarn.lock` with Yarn, then run an immutable reinstall and confirm that no installed package or source file references `@vue/composition-api`.
- [x] 6.9 Inspect `yarn why` and peer output to prove one Vue 2.7.16 runtime/renderer/compiler set and distinguish any unchanged non-Vue peer warnings.
- [x] 6.10 Keep the existing Vue 2 `set`/`del` operations as imports from `vue`, retain standard returned setup refs and native `onServerPrefetch`, and verify that no unused plugin-difference shims are introduced.

## 7. Vue 2.7 type remediation

- [x] 7.1 Run `yarn type-check` and classify every remaining error against the spike categories before editing: component-instance inference, translations/DOM attributes, refs/styles, component registries, and dynamic imports.
- [x] 7.2 Use `Vue.extend` only in confirmed Options/hybrid components where Vue 2.7 `defineComponent` loses template visibility of methods, mixins, or setup bindings; add or retain a representative test for each behavior class.
- [x] 7.3 Convert `TranslateResult` values to strings at HTML/component attribute boundaries without changing displayed translations.
- [x] 7.4 Bind Boolean HTML attributes with Boolean values and serialize array-valued attributes such as image source sets according to the DOM contract.
- [x] 7.5 Update CSS custom-property style contracts and component-ref types to the public instance and `CSSProperties` shapes returned by Vue 2.7.
- [x] 7.6 Introduce explicit common types for rich-text component registries and heterogeneous async modal loaders so one entry does not determine all entries.
- [x] 7.7 Resolve remaining Vue 2.7 errors with narrow real-boundary types; reject target downgrades, fake setup-context augmentation, blanket `as any`, or new global suppression.
- [x] 7.8 Require `yarn type-check` to finish with zero errors and review the remediation diff separately from the mechanical import diff.

## 8. Automated verification

- [x] 8.1 Run `yarn install --immutable`, `yarn dedupe --check`, all three Vue `yarn why` checks, and peer validation from a clean dependency state.
- [x] 8.2 Run `yarn lint` and verify that import ordering and type-only imports comply after the mechanical migration.
- [x] 8.3 Run `yarn test:unit:maintained --runInBand`, including the new instance-helper tests and representative root/theme component tests.
- [x] 8.4 Run `yarn test:upgrade:config` and `yarn test:upgrade:type-check-watch` to validate configuration lifecycle and Vue language-tool watch behavior.
- [x] 8.5 Run `yarn generate-files`, `yarn build:client`, `yarn build:server`, and `yarn build:sw`; then run the complete `yarn build` from a clean `dist`.
- [x] 8.6 Inspect build logs for missing named Composition API exports, duplicate Vue warnings, compiler/runtime mismatch, hydration warnings, and newly introduced webpack externalization warnings.
- [x] 8.7 Review the final source and lockfile diff to confirm there are no residual plugin imports/installations, unplanned dependency upgrades, or unrelated theme-pointer changes.
- [x] 8.8 Run the frozen watcher, `set`/`del`, setup-template-ref, and `onServerPrefetch` fixtures under native Vue 2.7 and require the same observable outcomes recorded at the Vue 2.6 checkpoint except for the approved template-ref teardown cleanup.

## 9. SSR, hydration, and commerce acceptance

- [x] 9.1 Start the production-like SSR application from the built artifacts and verify its health endpoint and representative successful server renders.
- [x] 9.2 Render consecutive requests with different routes and hosts and confirm that `$ssrContext`, Vuex state, and generated HTML do not leak across requests.
- [x] 9.3 Hydrate public landing, Storyblok, category, product, and structured-data routes in a browser and require a clean console.
- [x] 9.4 Exercise a full customization flow with nested form refs, price calculations, upload/form navigation, add-to-cart, edit-in-cart, coupon, and detailed-cart behavior.
- [x] 9.5 Exercise login, post-auth route restoration, authenticated account/order routes, logout, and mandatory feature-state clearing to detect cross-session leakage.
- [x] 9.6 Exercise guest and authenticated checkout/address paths plus each enabled express/payment entry point, confirming actions still flow through Vuex and TaskQueue.
- [x] 9.7 Compare conversion-critical analytics/tag-manager events and error monitoring against the Vue 2.6 checkpoint for the acceptance flows.
- [x] 9.8 During the acceptance flows, explicitly verify that watcher-driven address resets, uploads, currency/banner updates, authentication restoration, customization state, and cart-option restoration have neither missed nor duplicate effects.

## 10. Documentation, integration, release, and rollback

- [x] 10.1 Update active `AGENTS.md` stack, Composition API, and coding guidance from Vue 2.6/plugin wording to Vue 2.7 native Composition API wording.
- [x] 10.2 Update `.github/prompts/code-review.prompt.md` to review against Vue 2.7 contracts; preserve historical Vue 2.6 records in prior upgrade documentation.
- [x] 10.3 Record Vue 2 end-of-life ownership and the approved risk treatment or extended-support decision in the release record.
- [x] 10.4 Land the final theme commit, verify its CI, and update the parent submodule pointer to that exact SHA in the integrating parent commit.
- [x] 10.5 Run all automated and runtime gates against the exact combined parent/theme commits that will be promoted.
- [x] 10.6 Document the Vue 2.6 compatibility-checkpoint SHAs and the requirement to roll back client, server, lockfile, and theme pointer together.
- [x] 10.7 Deploy the same built commit through the staging/canary path and monitor SSR failures, hydration warnings, authentication, checkout/payment errors, and conversion events before full promotion.
- [x] 10.8 Complete final review against the capability scenarios and archive the OpenSpec change only after every required task and production acceptance gate is complete.
