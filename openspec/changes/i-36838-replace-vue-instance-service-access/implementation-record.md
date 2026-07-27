## Implementation baseline

Captured on 2026-07-26 before implementation changes.

### Revisions

- Parent branch: `36838-upgrade-to-vue-2-7`
- Parent commit: `35e1feb3dc23b0d2c061df1e19eac7a01d80f4c6`
- Theme branch: `36838-upgrade-to-vue-2-7`
- Theme working-tree commit: `9835f96ab0435279ffaa70491ef2b113f9c8fc84`
- Theme gitlink in the parent HEAD and index:
  `3f25c0e13f50a9bee376699ce7e45f3d7b5cf46d`
- The theme worktree is clean. The parent has an unstaged gitlink difference
  from `3f25c0e13f50a9bee376699ce7e45f3d7b5cf46d` to
  `9835f96ab0435279ffaa70491ef2b113f9c8fc84`.

### Toolchain

- Git: `2.43.0`
- Node.js: `24.17.0`
- Yarn: `4.17.1`
- OpenSpec: `1.6.0`
- TypeScript: `5.9.3`
- vue-tsc: `5.9.3`
- Vue: `2.7.16`
- Vue Router: `3.6.5`
- Vuex: `3.6.2`
- vue-i18n: `8.15.4`
- Docker CLI: unavailable in this execution environment

The manifest pins Node.js and Yarn to the recorded versions. `yarn why`
confirms the runtime versions above in the current install.

### Existing worktree state to preserve

The following paths existed before implementation and must not be discarded or
folded into this change without an explicit scope review:

- modified `.github/prompts/code-review.prompt.md`;
- untracked `.github/prompts/review-cases/`;
- untracked `Updated Quote Page Mockup - SAP.pdf`;
- untracked `cross-repository-ci-dispatch-plan.md`;
- untracked `project-upgrade-plan.md`;
- untracked `request-isolation-issue.md`;
- untracked `vue-3-preparation.md`;
- the pre-existing parent/theme gitlink difference recorded above.

The staged artifacts under
`openspec/changes/i-36838-replace-vue-instance-service-access/` are the planning
inputs for this implementation and are also preserved.

### Archived Vue 2.7 verification state

The archived change is
`openspec/changes/archive/2026-07-26-i-36838-upgrade-vue-2-7`.
Its checklist has every task checked. Its implementation record reports:

- immutable install, Vue dependency resolution, type-check, lint, maintained
  unit tests, upgrade fixtures, client/server/service-worker builds, the clean
  build, strict OpenSpec validation, and parent/theme diff checks passing;
- native Vue 2.7 setup refs clearing on teardown;
- focused runtime fixes and verification for BaseImage source sets,
  customize-later hydration, artwork-upload ARIA values, and configurable
  product SSR;
- a final concurrent two-host SSR parity fixture, 12 maintained suites with 47
  tests, type-check, lint, configuration lifecycle, strict OpenSpec validation,
  and diff checks passing.

The record also preserves intermediate statements that the initial local
runtime probe did not reach the listen callback and that broader acceptance was
not completed by those individual route probes. The archived all-checked
checklist is the final workflow state; the intermediate limitations remain part
of the evidence rather than being rewritten.

## Production access inventory

### Scope and repeatable search

The parent scan covers `core` and `src/modules`; the theme scan covers the theme
repository root. Both scans include `*.ts`, `*.js`, and `*.vue`, and exclude
test/spec/snapshot directories, `node_modules`, and `dist`.

The baseline was produced with `rg --count-matches --pcre2` for each literal
access path. Counts include imports, declarations, and call sites so the same
search can serve as a no-growth check during migration.

| Access path | Parent matches/files | Theme matches/files | Total matches/files |
| --- | ---: | ---: | ---: |
| `useRootInstance` | 43 / 22 | 103 / 50 | 146 / 72 |
| `useCurrentInstance` | 5 / 2 | 24 / 12 | 29 / 14 |
| `$root` | 5 / 2 | 0 / 0 | 5 / 2 |
| `$refs` | 6 / 6 | 59 / 37 | 65 / 43 |
| `$ssrContext` | 6 / 4 | 18 / 12 | 24 / 16 |
| Additional Content private/public fields | 17 / 4 | 42 / 21 | 59 / 25 |
| `$bus` | 151 / 29 | 43 / 12 | 194 / 41 |
| `$extendedHead` | 5 / 5 | 0 / 0 | 5 / 5 |
| Audited prototype/type-extension patterns | 101 / 19 | 0 / 0 | 101 / 19 |

Additional Content patterns are `$additionalContent`,
`_additionalContentRoot`, and `_additionalContent`. Audited extension patterns
include `Vue.prototype`, active Vue type augmentation, `$config`,
`$storyblokClient`, `$device`, `$ssrRequestContext`, and `$cacheTags`.

### Current-instance and root concentration

The parent `useCurrentInstance` occurrences are limited to its implementation
and shared barrel. Theme consumers are:

- `pages/ForeversCustomizeLater.vue`;
- `components/atoms/a-organization-schema.vue`;
- `components/molecules/m-login.vue`;
- `components/organisms/o-base-address-form.vue`;
- `components/organisms/o-billing-address.vue`;
- `components/customization-system/forms/alteration-product-form.vue`;
- `components/customization-system/forms/creation-wizard-form.vue`;
- `components/customization-system/forms/creation-wizard-form-last-step.vue`;
- `components/customization-system/forms/form-with-images-gallery.vue`;
- `components/customization-system/forms/order-item-customization-form.vue`;
- `components/customization-system/forms/phrase-pillow-form.vue`;
- `components/customization-system/forms/vertical-steps-form.vue`.

The only literal parent `$root` locations are the compatibility helper and
`src/modules/true-vault/index.ts`. There are no literal theme `$root` matches.

The five `$extendedHead` locations are:

- `core/app.ts`;
- `core/server-entry.ts`;
- `core/types/extended-head.d.ts`;
- `src/modules/fera/index.ts`;
- `src/modules/true-vault/index.ts`.

The parent `$ssrContext` component locations are:

- `src/modules/a-b-testing/index.ts`;
- `src/modules/budsies/components/ProductStructuredData.vue`;
- `src/modules/vsf-storyblok-module/components/global/RouterLink.vue`;
- `src/modules/vsf-storyblok-module/pages/StoryblokPage.vue`.

The theme `$ssrContext` locations are:

- `App.vue`;
- `pages/Authorization/Auth.vue`;
- `pages/Category.vue`;
- `pages/CustomizableProduct.vue`;
- `pages/ForeversCustomizeLater.vue`;
- `pages/PlushieProduct.vue`;
- `pages/Product.vue`;
- `components/atoms/a-organization-schema.vue`;
- `components/customization-system/forms/creation-wizard-form.vue`;
- `components/customization-system/forms/form-with-images-gallery.vue`;
- `components/customization-system/forms/phrase-pillow-form.vue`;
- `components/customization-system/forms/vertical-steps-form.vue`.

### Vue extension definitions and bootstrap paths

The scoped extension definitions/installations are concentrated in:

- `core/app.ts` for `$ssrRequestContext`, `$cacheTags`, and `$extendedHead`;
- `core/client-entry.ts` for the client `$cacheTags` set;
- `core/plugins/additional-content.plugin.ts`;
- `core/compatibility/plugins/event-bus/index.js`;
- `core/compatibility/plugins/config/index.js`;
- `core/types/additional-content.d.ts`;
- `core/types/extended-head.d.ts`;
- `src/modules/device/index.ts`;
- `src/modules/vsf-storyblok-module/hooks/beforeRegistration.ts`.

The Storefront UI progress-bar Vue augmentation is unrelated to the scoped
service-locator removal and is not treated as an extension targeted by this
change.

## Cache-tag exception baseline

Cache tags remain outside the request-service implementation. The literal
production baseline is:

- `$cacheTags`: 35 matches in 10 files;
- component `$ssrContext.output.cacheTags`: 2 matches in 2 files;
- all explicit `context.output.cacheTags` forms: 20 matches in 16 files.

### `$cacheTags` inventory

| Layer | File | Matches |
| --- | --- | ---: |
| bootstrap | `core/app.ts` | 1 |
| bootstrap | `core/client-entry.ts` | 2 |
| server entry | `core/server-entry.ts` | 1 |
| data resolver | `core/data-resolver/CategoryService.ts` | 5 |
| data resolver | `core/data-resolver/ProductService.ts` | 5 |
| Vuex getter | `src/modules/backend-settings/store/getters.ts` | 3 |
| Vuex action | `src/modules/budsies/store/actions.ts` | 8 |
| Vuex action | `src/modules/gift-card/store/actions.ts` | 2 |
| Vuex action | `src/modules/vsf-storyblok-module/store/actions.ts` | 5 |
| mapping fallback | `src/modules/url-rewrite/mappingFallback.ts` | 3 |

### Component `$ssrContext.output.cacheTags` inventory

- `src/themes/petsies-capybara/App.vue`: one `no-cache` write;
- `src/themes/petsies-capybara/pages/Authorization/Auth.vue`: one `no-cache`
  write.

### Explicit context cache-tag inventory

The dependent change must also retain the explicit non-component and
Options-API boundaries that write, read, serialize, or delete the request-local
set:

- `core/app.ts`;
- `core/modules/compare/components/Compare.ts`;
- `core/pages/Category.js`;
- `core/pages/Checkout.js`;
- `core/pages/CmsPage.js`;
- `core/pages/Error.js`;
- `core/pages/Home.js`;
- `core/pages/MyAccount.js`;
- `core/pages/PageNotFound.js`;
- `core/pages/Product.js`;
- `core/scripts/server.ts`;
- `core/scripts/utils/ssr-renderer.ts`;
- `src/modules/fastly/server.ts`;
- `src/modules/vsf-storyblok-module/components/StoryblokMixin.ts`;
- `src/themes/petsies-capybara/pages/Error.vue`;
- the two component locations listed above.

No cache-tag field may be added to the request service. Until the dependent
change lands, the no-new-usage baseline is fixed at the literal counts and file
sets above; any growth is a failure even if another existing occurrence is
removed in the same candidate.

## Characterization findings

### Repeated Vue 2.7 template refs

The focused keyed `v-for` fixture confirms that Vue updates the DOM to the new
rendered order but leaves the automatic setup-ref array in its original order.
Removal then drops the unmounted element. The explicit repeated-ref migration
therefore wraps the automatic Vue 2.7 binding in a setup-owned accessor that
sorts the current mounted instances by rendered DOM order at consumption time.
## Framework-independent EventBus

- Replaced the Vue instance at the existing EventBus import path with a dependency-free listener facade.
- Preserved listener order, chainable listener operations, once-listener removal by original callback, scalar/array filter payloads, and asynchronous filter result ordering.
- Isolated synchronous listener throws and asynchronous listener rejections so failures are reported without skipping later listeners or `$emitFilter` filters.
- Preserved Vue's no-argument `$off()` distinction for empty-string events and the legacy filter extension's live iteration when a filter is appended synchronously during an emission.
- Removed the Vue plugin/prototype getter and migrated all parent and theme production consumers to explicit imports.
- Updated the newsletter mixin suite to mock and reset the imported EventBus facade instead of installing a stale component `$bus` mock.
- Added focused domain-flow coverage for logout state clearing, cart mutation ordering, checkout arguments, payment place-order chaining, and customization request instrumentation.
- Mapped the legacy checkout suites to the maintained local unit utilities and refreshed their stale assertions; all five suites execute and pass 85 tests.

## App-scoped module contributions

- Kept `registerModule()` process-scoped for one-time Vue and Vuex setup and added `registerApplicationModule()` for contributors that consume per-app services.
- Registered TrueVault, Fera, and A/B assignment per application so consecutive applications receive their own head, Additional Content, and request-cookie contributions.
- Kept Fera's Vue mixin behind its existing process-wide `once()` guard while repeating only its app-specific head contribution.
- Added focused coverage proving global modules initialize once and app-scoped modules initialize once per application with the exact services for that application.

## Additional Content immutability

- Made Additional Content entry fields readonly and stored frozen entry copies so contributor or consumer mutation cannot change a registered key/component or bypass duplicate-key checks.
- Added focused coverage for source-entry mutation, consumer-entry mutation, readonly list mutation, late registration, SSR output, hydration, and application isolation.

## Store, router, route, and translation adapters

- Migrated 70 root/core and theme consumers from `useRootInstance()` to only the application-service adapters each consumer needs.
- Preserved all existing Vuex operation names, router payloads, reactive route reads, and translation arguments.
- Updated the selected-option URL-query test to provide real application services rather than mocking a root instance.
- The remaining production `useRootInstance()` call is limited to one template-ref lookup and is assigned to the explicit ref stage; no store, router, route, or translation access remains behind it.

## Explicit template refs

- Replaced all current/root-instance ref-map reads with setup-owned refs.
- Added a narrow `getFormValidationRefs()` child contract for customization options and the base address form; parent validation no longer traverses arbitrary child `$refs`.
- Replaced dynamic login and address anchors with stable setup bindings and explicit field-to-anchor mappings.
- Updated shipping, customer-address editing, and order-address editing to consume the base-address validation handle and added invalid-submission scroll/focus coverage for all three flows.
- Added a rendered-order-aware repeated-ref accessor and migrated repeated customization-form validation away from direct consumption of Vue 2.7's stale automatic ref arrays.
- Preserved document-order error selection, focus behavior, conditional teardown, and repeated-child aggregation in the focused ref suites.
- Mapped the legacy `@vue-storefront/unit-tests/utils` import to the maintained local utilities and refreshed the five checkout regression suites so all tests execute against the current checkout contracts.

## Request services

- Added per-application request services for host, user agent, named cookies, and optional server redirect with guarded browser equivalents.
- Migrated component metadata, canonical links, Storyblok links, category redirects, AB assignment, and customization filters away from full renderer contexts.
- Removed the process-global `$ssrRequestContext` bootstrap and deleted the inactive device prototype/module path.
- Concurrent SSR coverage proves isolation across distinct host, cookie, user-agent, redirect, canonical URL, and head values.
- The deferred `$cacheTags` inventory remains unchanged at 35 matches in 10 files, plus the two recorded component cache-tag consumers; request services contain no cache-tag access.

## Vue instance cleanup and enforcement

- Removed the unused config plugin, component Storyblok prototype assignment, obsolete head augmentation, current/root-instance helpers and tests, and inactive plugin installation barrel.
- Preserved the separately scoped Vuex Storyblok client dependency.
- Added `yarn test:upgrade:vue-instance-access`, which rejects removed access paths across parent/theme production code and enforces the exact temporary cache-tag inventory.
- Updated engineering and code-review guidance with the explicit service, ref, EventBus, head, and Additional Content boundaries, including EventBus failure isolation and per-application module registration for app-scoped service contributors.

## Validation

- `yarn install --immutable --check-cache` completed without a lockfile change or a new direct dependency. The checked install repaired a stale Rollup Linux optional-package artifact in `node_modules`.
- `yarn type-check`, `yarn lint`, and `yarn test:upgrade:vue-instance-access` pass. Lint retains 100 pre-existing warnings and reports zero errors.
- `yarn test:unit:maintained --runInBand` passes 22 suites and 88 tests; the complete newsletter unit directory passes 5 suites and 26 tests with the imported EventBus mock.
- `yarn generate-files`, `yarn build:client`, `yarn build:server`, `yarn build:sw`, and the clean `yarn build` pass. Build output contains the existing deployment-config, module-type, and asset-size warnings, with no missing-provider, hydration, browser-global, or duplicate-listener warning.
- `openspec validate i-36838-replace-vue-instance-service-access --strict` and parent/theme `git diff --check` pass.

## Runtime acceptance

- A production-mode SSR process served `/healthcheck`, `/`, `/about-petsies/`, `/custom-pillows/`, `/c/petsies-accessories/`, `/c/photo-pillows-designs/`, `/p/voice-recorder/`, and `/photo-pillows/create/?front_design=phrasePetsiesForeverInHeart` successfully.
- Representative renders contain server-rendered markers, request-host canonical URLs, and product/category structured data where applicable.
- Concurrent renders using distinct hosts, user agents, and test-group cookies returned isolated host-specific canonical output. Focused SSR tests additionally prove isolated cookie, redirect, head, and Additional Content state.
- Browser-only hydration and interactive form, customization, cart, authentication, checkout, gift-card, and payment acceptance remain pending because the integrated browser bridge cannot navigate to the local SSR process and the flows require interactive or seeded external state.

## Coordination blockers

- The parent and theme working trees contain pre-existing user changes, so this implementation does not create theme/parent commits or update the gitlink.
- No dependent cache-tag OpenSpec change currently exists. Its issue identifier remains an explicit design decision, so this implementation records the complete inventory without inventing a change name.
- Archival remains pending the browser/runtime matrix, reviewed parent/theme revisions, coordinated rollback identifiers, and an explicit link to the dependent cache-tag change.
