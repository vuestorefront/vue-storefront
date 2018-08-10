## TypeScript Action Plan

We've started adding the TypeScript support to Vue Storefront - mostly because of the following reasons:
- developer convinience (intelisense support in the IDE's)
- types safety and code-testability
- making Vue Storefront code base easier to understand for new-comers.

We're in the middle of [refactoring `core/components` to `core/api` modules](https://github.com/DivanteLtd/vue-storefront/issues/1213). All the modules should be created using TypeScript

### The Action Plan:

1. Introduce types - move *.js modules to *.ts modules incrementally without breaking changes. 
2. Use Types when it's approprierate in Your newly written modules and new features.
3. One Vuex module, or just few components refactored within one release (once a month) is fine.
4. All `core/api` modules should be created using TypeScript.
5. All new modules and vuex stores should be created using TypeScript.
6. **For now please don't refactor existing UI layer (components, pages) to use TypeScript. We should focus at Vuex, core libraries and API's at first to not introduce a chaos into theme development.**
6. We should put the types/interfaces inside `core/store/types` for all Entity/Data related models or in `core/types` for some shared one's; for example: Product.ts should be placed in `core/store/types/product/Product.ts`
