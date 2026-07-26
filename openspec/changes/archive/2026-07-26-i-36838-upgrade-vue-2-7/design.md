## Context

The application is an SSR Vue Storefront 1 storefront on Vue 2.6.14. It installs `@vue/composition-api` globally and uses the plugin from 185 files: 3 under `core`, 67 in root feature modules, and 115 in the `petsies-capybara` theme submodule. The root and theme manifests both declare Vue, while `vue-server-renderer`, `vue-template-compiler`, and the root resolution also pin the framework version.

Vue 2.7 backports the Composition API, but its native `SetupContext` exposes only `attrs`, `listeners`, `slots`, `emit`, and `expose`. The plugin additionally exposes `root`, `refs`, and `ssrContext` at runtime. The application relies on those extensions extensively, including store, router, translation, component-ref, and request-context access. Pretending those fields still exist through module augmentation would make TypeScript pass while leaving them undefined at runtime.

A disposable Vue 2.7.16 spike on 2026-07-26 established the migration baseline:

- Yarn resolved one Vue 2.7.16 runtime, renderer, and template compiler; removing the plugin eliminated the Vue peer conflict.
- The installed `vue-loader` 15.11.1, PostCSS 8 toolchain, ESLint Vue plugin, and Vue language tooling can remain.
- The production SSR server bundle compiled successfully.
- A mechanical import/context switch produced 193 type errors across 92 files: 139 `root` errors, 9 `refs` errors, Vue 2.7 template-instance inference errors, stricter DOM attribute types, and several component/dynamic-import type mismatches.
- Replacing `defineComponent` with `Vue.extend` in five representative Options/hybrid components cleared their template-instance errors; one component retained only its expected `context.root` errors.
- The current Vue 2.6 branch already has five unrelated type-check failures, so those must be resolved or isolated before a zero-regression upgrade gate is meaningful.

A source audit against the plugin's documented limitations narrowed the behavioral migration surface. The application has watcher usage in 36 files but does not use watcher debugging hooks or explicit `flush` modes. It has 14 Composition API `set`/`del` calls across six files, standard string template refs paired with returned `ref(null)` bindings, and three `onServerPrefetch` call sites. It does not currently use the behavior-changing `reactive`, shallow/readonly/proxy-inspection APIs, `computed().effect`, reactive arrays as root values, function refs, JSX/TSX, or the plugin's `createApp`/`h` helpers. Most remaining plugin limitations are Vue 2 reactivity constraints that native Vue 2.7 also retains, so they do not justify compatibility shims or unrelated source rewrites.

Most affected files are owned by the theme repository, but dependency resolution, application bootstrap, renderer configuration, and the lockfile are owned by the parent repository. The migration therefore crosses a git-submodule boundary and must preserve SSR/client version parity throughout integration.

## Goals / Non-Goals

**Goals:**

- Run the client, SSR renderer, compiler, and tests on exactly Vue 2.7.16 with one resolved Vue runtime.
- Replace the plugin with Vue's native Composition API without changing storefront behavior or module boundaries.
- Remove every runtime dependency on plugin-only setup-context fields through a small typed compatibility boundary.
- Finish with a clean immutable install, peer/de-duplication checks, type-check, lint, maintained unit tests, upgrade tests, client build, server build, service-worker build, and targeted SSR/hydration smoke tests.
- Keep the theme and parent changes reviewable, bisectable, and independently rollable back.

**Non-Goals:**

- Migrate to Vue 3, Vue Storefront 2, Pinia, Vite, or a different SSR architecture.
- Convert Options API components or mixins to the Composition API merely for style consistency.
- Introduce `<script setup>`, CSS `v-bind`, or other optional Vue 2.7 syntax.
- Modernize unrelated dependencies or change Vuex, EventBus, routing, TaskQueue, authentication, checkout, or caching behavior.
- Claim that Vue 2.7 restores upstream security support; Vue 2 remains end-of-life.

## Decisions

### Pin the complete Vue runtime/compiler set to 2.7.16

The root manifest will use exact `2.7.16` versions for `vue`, `vue-server-renderer`, and `vue-template-compiler`, and its resolution will enforce the same Vue version. The theme manifest will also declare exact Vue 2.7.16 because its direct descendants require the theme workspace to provide the Vue peer; the root resolution and lockfile must still prove that this declaration does not install a second runtime.

`vue-template-compiler` stays because the current Vue 2 test stack (`@vue/test-utils` 1.x and `@vue/vue2-jest`) peer-requires it. `vue-loader`, PostCSS, ESLint, and Vue language tooling remain at their already-compatible versions. `vue-demi` is absent and will not be introduced.

Alternative considered: remove Vue from the theme manifest and let the root own the declaration exclusively. The spike retained a clean, single runtime with the theme declaration and avoided making the theme's existing peer providers implicit, so exact duplicate declarations plus one enforced resolution is safer for this workspace layout.

### Split the migration at a Vue 2.6-compatible checkpoint

The first implementation stage will remain on Vue 2.6 and the plugin while removing all uses of plugin-only setup-context fields. Only after that stage type-checks, tests, builds, and passes SSR smoke checks will the dependency and import switch occur.

This order separates application refactoring from framework replacement, makes runtime parity testable before the version change, and creates a clean rollback commit. A one-step mechanical migration was rejected because its 193-error result mixes genuine runtime hazards with type-only remediation and obscures regressions.

### Access the current Vue instance through one fail-fast helper

A focused composable/helper will call `getCurrentInstance()` during `setup()`, verify that an instance exists, and expose its public `proxy` as the current Vue component. A companion helper may return `proxy.$root` for code whose exact existing behavior requires the root Vue instance. Existing store, router, route, translation, and options access will be migrated through that typed boundary.

Component refs will come from the current public instance's `$refs`, with existing domain-specific helpers such as nested-form-ref extraction retained. SSR request data will come from the current public instance's `$ssrContext` and remain guarded from browser execution. Composables that only emit events will accept `Pick<SetupContext, 'emit'>` or an explicit callback instead of the complete context.

The helper will throw a descriptive error when invoked outside component setup. Silently returning `undefined`, adding fake native `SetupContext` fields, or applying an `any`-based compatibility type were rejected because they defer failures into checkout, form, or SSR paths.

### Import Composition API symbols from `vue` only after context decoupling

After the compatibility checkpoint, all runtime functions and types currently imported from `@vue/composition-api` will be imported from `vue`. The plugin package, `Vue.use` calls in application/test bootstrap, and the obsolete setup-context module augmentation will be removed together. Existing supported APIs such as `ref`, `computed`, `watch`, lifecycle hooks, `set`, and `del` retain their behavior; there is no need to rewrite the project-local `createApp` function or the root `new Vue` application bootstrap.

Client code will continue using named ESM imports. The SSR bundle externalizes Vue through its CommonJS build, where the Vue 2.7 Composition API functions are properties on the Vue export. Both formats are therefore explicit validation targets.

### Preserve Vue 2 reactivity patterns and verify native parity

The migration will retain Vue 2's `set` and `del` calls. Native Vue 2.7 intentionally exports them because property addition and deletion still require Vue 2 reactivity handling; converting them to direct assignment or `delete` would create a real regression rather than modernize the code.

Standard setup template refs will also remain in their existing `const element = ref(null)` plus `return { element }` form. Both the plugin and native Vue 2.7 support that contract. Only code that reads the plugin-only `context.refs` extension will move to the current public instance's `$refs`.

The Vue 2.6 baseline fixture showed that `@vue/composition-api` assigns a
returned template ref on mount but leaves the destroyed element in an
externally retained ref after teardown. This stale-ref behavior is not a
compatibility guarantee. Native Vue 2.7 must clear the ref during teardown;
the frozen fixture will retain a version-specific assertion that documents the
Vue 2.6 limitation and requires the Vue 2.7 cleanup improvement without adding
a shim to reproduce the stale reference.

The three `onServerPrefetch` hooks remain native lifecycle hooks. Their fetching behavior will not be rewritten; only any plugin-only route/root/SSR-context source used by the surrounding composable will move to the typed current-instance boundary.

Because native Vue 2.7 replaces the plugin's watcher implementation, the same behavioral fixtures will run before and after the switch. They will cover default, immediate, and deep watchers in representative customization, country/state address reset, upload, currency/banner, authentication route-restoration, and cart-option flows. Additional fixtures will prove `set`/`del` invalidation, setup template-ref assignment, the explicitly approved Vue 2.7 teardown cleanup, and server-prefetch completion with request-local context.

Alternative considered: mechanically rewrite Vue 2 reactivity workarounds or emulate every documented plugin difference. This was rejected because the relevant workarounds are still required by Vue 2.7 and the materially different plugin APIs are not used by this codebase. Adding unused shims would increase the future migration surface without preserving any current behavior.

### Remediate Vue 2.7 types by error class, without blanket suppression

Type remediation will use the narrowest pattern appropriate to each confirmed class:

- Use `Vue.extend` in the limited Options/hybrid components where native `defineComponent` loses template visibility of `methods`, mixins, or setup bindings. Do not convert unaffected components.
- Keep native `defineComponent` where it infers correctly, and add explicit setup-return or component contracts only where they improve the real boundary.
- Type rich-text component registries and async modal loaders against a shared Vue component/loader abstraction instead of allowing the first entry to determine every later entry's type.
- Convert translated attribute values to strings at the attribute boundary.
- Bind Boolean HTML attributes as booleans, serialize array-valued attributes such as `srcset`, and use Vue 2.7-compatible `CSSProperties` for CSS custom properties.
- Widen component-ref domain types to the public-instance shapes Vue 2.7 can actually return.

No global `skipLibCheck` expansion, `vue-tsc` target downgrade, blanket `as any`, or fake module augmentation is acceptable. A target experiment using `vueCompilerOptions.target: 2` did not reduce the spike errors and would hide the intended Vue 2.7 contract.

### Restore a green pre-upgrade type baseline

Before switching Vue, the existing five Vue 2.6 type failures will be fixed in a separate preparatory commit: two menu item `class` errors, two reminder-form content errors, and one customization option-price error. This keeps `yarn type-check` as a binary release gate rather than comparing two red outputs or silently accepting a baseline file.

Alternative considered: document those failures and require only "no new errors." That is weaker and makes future regression accounting dependent on output matching, so a small explicit baseline repair is preferred.

### Validate behavior at framework and commerce boundaries

Static validation alone is insufficient because the main incompatibility is runtime context. Unit tests will cover the instance/root/ref/SSR compatibility helper and representative composables. A Vue 2.6 parity fixture set will establish observable behavior for default/immediate/deep watchers, `set`/`del`, normal setup template refs, and `onServerPrefetch`; the same fixtures will then run unchanged against native Vue 2.7, with a version-specific template-ref teardown assertion that requires cleanup only under native Vue 2.7. Existing maintained tests and upgrade-coordinator tests will run unchanged except for removal of plugin installation.

Production client, server, and service-worker artifacts will all be built. Runtime smoke coverage will render and hydrate representative public, Storyblok, product-customization, cart, authentication, account/order, and checkout/payment routes; it will verify no hydration warnings, missing Composition API functions, duplicate Vue warnings, cross-request SSR state, or browser-global access on the server. Business operations must continue through Vuex actions and TaskQueue.

### Coordinate the theme before advancing the parent pointer

Theme-owned helper/component/import/type changes will land as a dedicated theme commit and pass the theme-relevant validation while checked out by the parent. The parent commit will then update root dependencies/bootstrap/types and advance the submodule pointer to that exact theme commit. CI must test the combined state; neither repository should merge a state that expects an unavailable counterpart without an explicit integration branch.

## Risks / Trade-offs

- [A plugin-only context field is missed] → Search for plugin imports and all `root`, `refs`, and `ssrContext` context patterns; delete the augmentation; add unit and route smoke tests that exercise each boundary.
- [Native watcher scheduling causes missed or duplicate effects] → Capture default, immediate, and deep watcher outcomes under Vue 2.6 and run the same fixtures and representative watcher-driven commerce flows under Vue 2.7.
- [`set`/`del`, template refs, or server prefetch regress during the mechanical migration] → Keep the Vue 2 patterns that native 2.7 supports and require focused cross-version tests, including the approved template-ref cleanup improvement and two-request SSR isolation.
- [Client and SSR load different Vue versions or module formats] → Exact lockstep pins, root resolution, immutable install, `yarn why vue`, de-duplication/peer checks, both production bundles, and SSR execution are release gates.
- [Targeted `Vue.extend` changes alter component inference] → Apply it only to confirmed failing components and exercise their templates/events in unit or smoke tests.
- [Most changes span a submodule] → Land the theme commit first, record its SHA, and update the parent pointer only in the integrating commit.
- [Checkout, authentication, or customer data behaves differently after hydration] → Include guest/authenticated transitions, logout clearing, checkout/payment, and two-request SSR isolation in the smoke matrix.
- [Vue 2 remains unsupported upstream] → Record an explicit security-owner decision for accepted EOL risk or extended support; continue treating a Vue 3/platform migration as separate work.
- [Large mechanical import diff obscures behavior changes] → Separate compatibility, import/dependency, type-remediation, and documentation commits; review generated import-only changes independently.

## Migration Plan

1. Assign the real issue identifier, preserve unrelated worktree changes, and capture the current install/peer/test/build baseline.
2. Repair the five existing type-check failures in an isolated Vue 2.6 commit.
3. Add and test the current-instance compatibility helper under Vue 2.6; migrate root, ref, SSR-context, and over-broad `SetupContext` consumers in root and theme code. Add cross-version parity fixtures for watchers, `set`/`del`, standard setup template refs, and `onServerPrefetch`.
4. Run the complete Vue 2.6 quality/build/smoke gate, capture the parity-fixture results, and tag or record this compatibility checkpoint.
5. Land the coordinated theme commit, then update the parent dependency set, lockfile, imports, plugin bootstrap/tests, Vue compiler target, types, and submodule pointer to Vue 2.7.16.
6. Remediate only the confirmed Vue 2.7 type classes, keeping each class in a reviewable commit.
7. Run immutable install and resolution checks, replay the unchanged parity fixtures on Vue 2.7, and run all static/tests/build gates, SSR execution, hydration and commerce smoke coverage, and production observability checks.
8. Deploy through the normal staged environment with client/server artifacts from the same commit. Monitor server render failures, hydration warnings, checkout/payment exceptions, authentication flows, and conversion-critical events before full promotion.

Rollback uses the recorded Vue 2.6 compatibility checkpoint, including its matching theme SHA and lockfile. Client and SSR deployments must roll back together; reverting only the renderer, theme pointer, or browser assets is unsupported. No persisted data migration is involved.

## Open Questions

- Who owns the release decision to accept Vue 2 end-of-life risk versus purchasing extended support? This does not block implementation, but it must be recorded before production approval.
