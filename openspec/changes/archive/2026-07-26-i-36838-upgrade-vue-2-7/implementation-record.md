## Vue 2.6 baseline snapshot

Captured on 2026-07-26 before framework-compatibility implementation.

### Revisions and tools

- Parent branch: `petsies-theme`
- Parent commit: `097e8d6be392bf5a949045c219be2a598770c291`
- Theme branch: `petsies-theme`
- Theme working-tree commit: `4e54676b64d4c55cdeeb49f424e4f4e8b68dfd53`
- Theme gitlink recorded in the index: `4e54676b64d4c55cdeeb49f424e4f4e8b68dfd53`
- Node: `v24.17.0`
- Yarn: `4.17.1`

### Pre-existing worktree state to preserve

The theme working tree was clean. The parent repository already contained the
following staged changes before implementation:

- OpenSpec skill and prompt updates under `.codex/skills/`,
  `.github/skills/`, and `.github/prompts/opsx-*`.
- The staged `Updated Quote Page Mockup - SAP.pdf`,
  `cross-repository-ci-dispatch-plan.md`, and `project-upgrade-plan.md` files.
- The staged OpenSpec artifacts for this change.
- A staged theme gitlink update from
  `3f25c0e13f50a9bee376699ce7e45f3d7b5cf46d` to
  `4e54676b64d4c55cdeeb49f424e4f4e8b68dfd53`.

The parent repository also contained the untracked
`.github/prompts/review-cases/` directory. These pre-existing changes must not
be discarded, rewritten, or included accidentally in a framework-upgrade
commit without an explicit scope review.

### Dependency baseline

`yarn install --immutable` completed successfully without changing the
manifests or lockfile. Resolution checks reported one Vue `2.6.14` runtime,
one `vue-server-renderer` `2.6.14`, and one `vue-template-compiler` `2.6.14`.

Vue-related warning:

- `p4b4aba`: root Vue `2.6.14` cannot satisfy the non-overlapping Vue peer
  ranges requested by `@gtm-support/vue2-gtm` and other dependencies.

Pre-existing non-Vue peer warnings:

- `p91a688`: the Storyblok workspace does not provide `axios`.
- `pbc2d41`: Storefront UI does not provide `@types/leaflet`.
- `pd92b97`: legacy TypeScript ESLint experimental utilities do not provide
  `typescript`.
- `pb78cc3` and `pcd68f2`: `storefront-query-builder` does not provide
  `eslint` or `typescript` to its legacy parser dependencies.

`yarn dedupe --check` also reported the pre-existing opportunity to deduplicate
`undici@^8.4.1` from `8.7.0` to the root `8.8.0`; no lockfile change was made
during baseline capture.

### Quality baseline

- `yarn type-check`: passed with zero errors.
- `yarn lint`: passed with zero errors and 102 pre-existing warnings.
- `yarn test:unit:maintained --runInBand`: passed, 7 suites and 36 tests.
  The Banner tests emitted their existing duplicate setup-binding Vue warnings.
- `yarn test:upgrade:config`: passed.
- `yarn test:upgrade:type-check-watch`: passed.
- `yarn build`: passed. The service-worker build retained the existing
  production config-name and module-type warnings.

The five type-check failures described by the migration spike are no longer
present in this baseline. Their preparatory remediation is already included in
theme commit `19c34a72e4bc8df81d402aa98d54e5939fbbe046`
(`Refs #36838: Fix vue-tsc warnings in components`), which is an ancestor of
the captured theme revision. No additional baseline-fix edit or commit is
needed on the current branch.

The complete baseline was replayed after confirming the preparatory fix
revision. Type-check, lint, maintained unit tests, both upgrade tests, and the
full build reproduced the same green results and warning profile.

### Composition API parity fixture finding

The Vue 2.6 watcher fixture reproduced the expected default, immediate, and
deep effects for customization, address reset, upload, currency/banner,
authentication restoration, and cart-option scenarios. The `set`/`del`
fixture invalidated both computed and rendered consumers. The SSR fixture
awaited `onServerPrefetch` and kept host data isolated across two renders.

The setup template-ref fixture found a mismatch with the original acceptance
condition: the returned `ref(null)` was assigned to the input element on mount,
but `@vue/composition-api` 1.7.1 left that element in the ref after
`wrapper.destroy()`, including after pending Vue and Promise ticks. The
approved resolution records this as a Vue 2.6 plugin limitation and requires
native Vue 2.7 to clear the ref during teardown. The frozen fixture uses a
version-specific assertion so the cleanup improvement remains explicit and no
shim preserves the stale reference.

## Vue 2.6 compatibility checkpoint

The root and theme compatibility migration removed all production and test
access to `SetupContext.root`, `SetupContext.refs`, and
`SetupContext.ssrContext`. Root access now goes through `useRootInstance()`;
template refs and SSR request context go through `useCurrentInstance()`. The
temporary setup-context augmentation was deleted.

- `yarn type-check`: passed with zero errors.
- `yarn lint`: passed with zero errors and 104 warnings. The two warnings added
  since baseline are the focused test fixture's multiple local components.
- `yarn test:unit:maintained --runInBand`: passed, 9 suites and 43 tests. The
  Banner suite retained its pre-existing duplicate setup-binding warnings.
- `yarn test:upgrade:config`: passed.
- `yarn test:upgrade:type-check-watch`: passed.
- Focused current-instance and frozen parity fixtures: passed, 2 suites and 7
  tests.

The first maintained-suite run exposed a test-only import-boundary regression:
importing the helper through the broad shared barrel caused the Banner test's
mocked core helper module to initialize the store with a missing `once`
function. Banner now imports the composable directly while the public barrel
export remains available; the complete maintained suite then passed.

## Native Vue 2.7 verification

The framework switch pins `vue`, `vue-server-renderer`, and
`vue-template-compiler` to `2.7.16` in the root, pins the theme Vue provider to
the same version, removes `@vue/composition-api`, and changes Composition API
imports to `vue`. Both Vue language-tool configs target Vue 2.7.

`yarn why` reports one `2.7.16` runtime, renderer, and template compiler.
`yarn install --immutable` passes. Peer inspection has no Vue mismatch and
retains the baseline non-Vue issues for Storyblok `axios`, Storefront UI
`@types/leaflet`, and the legacy TypeScript ESLint dependency.

The first native type-check produced only the planned remediation categories:
hybrid component inference, translation and DOM attributes, component refs and
CSS properties, rich-text component types, and heterogeneous modal loaders.
The remediations use selective `Vue.extend`, string conversion at attribute
boundaries, Boolean and serialized DOM values, Vue 2.7 public-instance and
`CSSProperties` contracts, and explicit common registry/loader types.

- `yarn type-check`: passed with zero errors.
- `yarn lint`: passed with zero errors and the same 104-warning checkpoint
  profile.
- `yarn test:unit:maintained --runInBand`: passed, 9 suites and 43 tests.
- `yarn test:upgrade:config`: passed.
- `yarn test:upgrade:type-check-watch`: passed.
- The frozen native parity fixture passed, including teardown clearing the
  returned setup template ref under Vue 2.7.
- `yarn generate-files`, `yarn build:client`, `yarn build:server`,
  `yarn build:sw`, and the clean `yarn build`: passed.
- Strict OpenSpec validation and both parent/theme `git diff --check` checks:
  passed.

Build output contains only the established config-name, package module-type,
and client asset-size warnings. It contains no missing Composition API export,
duplicate Vue, compiler/runtime mismatch, or new externalization warning.

The final OpenSpec dependency gate applies Yarn's highest-strategy
deduplication for the baseline `undici@^8.4.1` opportunity and the compatible
`postcss@^8.4.40` opportunity introduced into the resolution graph by Vue
2.7's compiler package. A subsequent immutable install and
`yarn dedupe --check` pass; type-check and all 9 maintained suites also remain
green against that exact lockfile.

The local runtime acceptance probe compiled the development SSR bundle
successfully but did not reach the HTTP server's listen callback before the
probe timeout. No health or rendered-route response was available. Runtime
tasks 9.1 through 9.8 therefore remain open for an environment with the
required initialization services and browser access.

### BaseImage source-set render regression

Runtime rendering exposed that the Vue 2.7 DOM-attribute remediation called
`join()` directly on `defaultSrcSet`. That computed value is intentionally
undefined when `BaseImage` receives a plain `src`, as it does for the header
logo. The attribute boundary now uses a separate optional serialized value:
plain images omit `srcset`, while fallback and responsive source sets remain
comma-separated strings.

A focused component regression suite covers both paths. The focused suite
passes with 2 tests, the maintained suite passes with 10 suites and 45 tests,
`yarn type-check` and focused ESLint pass, and `yarn build:server` compiles
successfully. Strict OpenSpec validation and `git diff --check` also pass.

### Customize-later hydration regression

Browser rendering of `/forevers/customize-later/` exposed a native Vue 2.7
computed-ref boundary in `useSelectedOptionValueUrlQuery`. The query watcher
serialized the computed ref object instead of its value. Native Vue 2.7 keeps
the component watcher and effect scope on that object, so serialization failed
with a circular `VueComponent` structure and aborted component setup. The
subsequent missing `isCustomizeMode` and `totalPrice` warnings, price render
exception, and hydration fallback were downstream effects of that setup
failure.

The query watcher now serializes `showInUrlQueryData.value`. A focused
component-scoped regression test proves setup no longer serializes the ref.
The separate client-build warning in service-worker registration was removed
by consuming the default-exported config module through its default import.

After a clean browser reload, the live customize-later form rendered its
regular/special price and Add to Cart action without the reported setup,
property, render, hydration, or service-worker import warnings. The focused
test, type-check, focused ESLint, 11 maintained suites with 46 tests, client
build, server build, strict OpenSpec validation, and diff checks pass. The
client build retains only its established asset-size warnings. This validates
the reported route render but does not complete the broader multi-route
hydration or full customization-flow acceptance tasks.

### Artwork-upload ARIA prop regression

Browser navigation to `/forevers/create/?step=photo` exposed an ARIA boundary
regression. The Vue 2.7 type remediation changed the shared
`useErrorAccessibility` result from string tokens to a Boolean. Native
elements accept Boolean-like ARIA bindings, but `MArtworkUpload` declares a
string prop and passes that value to `setAttribute`, so Vue warned when it
received `false`.

The helper now exposes the narrow `'true' | 'false'` token union. This remains
valid for native ARIA bindings and restores the component-prop contract. A
focused helper test covers both states.

The live creation flow advanced from Type to Photo, mounted the uploader with
`aria-invalid="false"`, and did not reproduce the invalid-prop warning.
Type-check, focused ESLint, the focused test, 12 maintained suites with 47
tests, the client build, strict OpenSpec validation, and diff checks pass. This
is additional customization-route evidence but does not complete the full
customization acceptance task.

### Configurable-product SSR mutation regression

SSR rendering of
`/p/customcollar/customcollar_jazzy_blue/` exposed a shared-configuration
mutation in `omitSelectedVariantFields`. For a selected variant without an
image, the helper pushed `"image"` directly into
`config.products.omitVariantFields`. The runtime config array was
non-extensible, so `push` threw. Even when extensible, that implementation
polluted shared configuration across products and SSR requests.

The helper now clones the configured omission list before adding the
request-specific image field. A focused regression test uses a frozen config
array, calls the helper repeatedly, verifies the source list remains unchanged,
and covers both absent and present variant images.

The live product route renders the Custom Bling Collar and Jazzy Blue variant.
A separate raw request returns HTTP 200 with the product, variant, and SSR
initial state in the HTML. The focused 2-test suite, type-check, focused ESLint,
12 maintained suites with 47 tests, server build, strict OpenSpec validation,
and diff checks pass. This is representative product-route SSR evidence but
does not complete the broader runtime acceptance tasks.

### Follow-up regression-pattern audit

A follow-up audit reviewed the complete root and theme migration diff plus
production source for the runtime patterns exposed above:

- method calls and nested property reads introduced into migrated templates;
- `Ref` and `ComputedRef` values crossing serialization, persistence, routing,
  logging, Vuex, and request boundaries without unwrapping;
- DOM-attribute type remediations passed through Vue component props;
- in-place mutation rooted at imported configuration or constants; and
- named imports from `config`, JSON, or other default-only modules.

No additional migration-caused defect was confirmed. The only newly introduced
template method call was the already guarded `BaseImage` source-set
serialization. Other high-risk component expressions retain guards or
non-optional contracts. The apparent persisted-customer ref-boundary matches
were plain string parameters shadowing outer ref names. No remaining production
named import from `config` or JSON and no other imported config collection
mutation was found.

The current-instance SSR parity fixture now renders two different hosts
concurrently and requires each component to retain its own `$ssrContext`.
Legacy request-sensitive state still exists on `Vue.prototype` (`$cacheTags`
and `$ssrRequestContext`) and in existing singleton modules. Those mechanisms
predate this migration and require the production-like cross-request acceptance
work in task 9.2; this static audit does not treat them as fixed or mark that
task complete.

The concurrent SSR parity fixture passes with both hosts isolated. The full
maintained suite passes with 12 suites and 47 tests; type-check, lint with the
established 104-warning profile, the configuration lifecycle test, strict
OpenSpec validation, and parent/theme diff checks also pass.
