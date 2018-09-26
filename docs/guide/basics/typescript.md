# TypeScript Action Plan

We've started adding the TypeScript support to Vue Storefront - mostly because of the following reasons:

- developer convenience (intellisense support in the IDEs)
- types safety and code-testability
- making Vue Storefront code base easier to understand for newcomers.

## Desired state

**Type Script is for internal implementation only. Does NOT affect ES users, but should improve TS integration for TS users.**

Desired state is that Vue Storefront Core outputs JS libraries, it's written using some TypeScript features, but all the user code (themes, extensions) is still JavaScript. No TypeScript experience is required to build Vue Storefront stores. **This is just for core developers and transparent to the end users.**

Therefore we're refactoring just:

- core/api
- core/store
- core/lib

where it makes sense. The key TypeScript feature we feel is usable are data types.

We're in the middle of [refactoring `core/components` to `core/api` modules](https://github.com/DivanteLtd/vue-storefront/issues/1213). All the modules should be created using TypeScript

### The Action Plan:

1. Introduce types - move _.js modules to _.ts modules incrementally without breaking changes.
2. Use types when it's appropriate in your newly written modules and new features.
3. One Vuex module, or just few components refactored within one release (once a month) is fine.
4. All `core/api` modules should be created using TypeScript.
5. All new modules and Vuex stores should be created using TypeScript.
6. **For now please don't refactor existing UI layer (components, pages) to use TypeScript. We should focus at Vuex, core libraries and APIs at first to not introduce a chaos into theme development.**
7. We should put the types/interfaces inside `core/store/types` for all Entity/Data related models or in `core/types` for some shared ones; for example: `Product.ts` should be placed in `core/store/types/product/Product.ts`
8. We should use minimal possible set of interfaces. Try to introduce 1-2 interfaces per entity (e.g. Product shouldn't be represented by more than 2 interfaces)
