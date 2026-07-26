## Why

The storefront still runs Vue 2.6 with the now-end-of-life `@vue/composition-api` plugin, while Vue 2.7 provides the Composition API natively and is the final Vue 2 release. Upgrading establishes the most maintainable Vue 2 baseline available to this SSR application, removes an obsolete runtime plugin, and resolves the current Vue peer-version conflict without taking on a Vue 3 migration.

## What Changes

- Upgrade `vue`, `vue-server-renderer`, and the test-time `vue-template-compiler` to the same exact Vue 2.7 release and enforce a single resolved Vue runtime.
- Remove `@vue/composition-api`, its global installation, and its test setup; import supported Composition API functions and types from `vue`.
- **BREAKING**: Replace plugin-only `SetupContext.root`, `SetupContext.refs`, and `SetupContext.ssrContext` access with explicit, typed component-instance compatibility helpers before removing the plugin.
- Preserve the Vue 2 reactivity patterns the application actually uses and prove native Vue 2.7 parity for watchers, `set`/`del`, setup template-ref assignment, and `onServerPrefetch`; explicitly accept native teardown cleanup of template refs instead of preserving the plugin's stale-ref behavior.
- Remediate the Vue 2.7 component/template type changes without broad type suppression or functional rewrites.
- Update the TypeScript Vue target, lockfile, SSR/client build validation, maintained tests, runtime smoke coverage, and live engineering guidance.
- Coordinate the theme-submodule changes and parent submodule pointer as separate, reviewable commits.
- Record Vue 2 end-of-life as an accepted platform risk (or separately select an extended-support provider); this change does not make Vue 2 a supported upstream platform.

## Capabilities

### New Capabilities

- `vue-2-7-runtime-compatibility`: Defines the dependency, Composition API, SSR, typing, build, and runtime-compatibility guarantees for the storefront's Vue 2.7 baseline.

### Modified Capabilities

None.

## Impact

- Root application: `package.json`, `yarn.lock`, `core/app.ts`, TypeScript configuration, Vue compatibility types/helpers, build validation, and unit-test setup.
- Feature code: Composition API imports, plugin-specific setup-context usage, and parity coverage for watcher-driven state, reactive property insertion/deletion, template refs, and server prefetch across `core`, `src/modules`, and the `petsies-capybara` theme.
- Theme repository: most affected components and helpers live in the theme git submodule, requiring a theme commit before the parent repository pointer update.
- Runtime: both client hydration and the Vue server renderer change in lockstep; storefront behavior, public APIs, Vuex data flow, routing, and rendered output are intended to remain unchanged.
- Operations and security: Vue 2.7 is end-of-life, so vulnerability support remains a release-governance concern after this upgrade.
