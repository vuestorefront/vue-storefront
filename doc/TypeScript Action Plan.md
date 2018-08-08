## TypeScript Action Plan

We've started adding the TypeScript support to Vue Storefront - mostly because of the following reasons:
- developer convinience (intelisense support in the IDE's)
- types safety and code-testability
- making Vue Storefront code base easier to understand for new-comers.

We're in the middle of [refactoring `core/components` to `core/api` modules](https://github.com/DivanteLtd/vue-storefront/issues/1213). All the modules should be created using TypeScript

The Action Plan:

1. Introduce types - move *.js modules to *.ts modules incrementally without breaking changes. 
2. One Vuex module, or just few components refactored within one release (once a month) is fine.
3. All `core/api` modules should be created using TypeScript.
4. All new components/pages and vuex stores should be created using TypeScript.
5. We should put the types/interfaces inside `core/api/<module-name>/typings` or `core/types` for shared one's; for example: Product.ts should be placed in `core/types/Product.ts`
