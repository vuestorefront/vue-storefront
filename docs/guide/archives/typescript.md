# TypeScript Action Plan

:::danger REMINDER
This document is _archived_ and _NOT_ relevant with the latest version which is `1.12` at the time of writing. Please keep in mind this document is supposed to help you maintain legacy product, not the fresh installation. 
:::


We've started adding TypeScript support to Vue Storefront, mostly because of the following reasons:

- Developer convenience (IntelliSense support in the IDEs)
- Types safety and code-testability
- Making Vue Storefront code base easier to understand for newcomers.

## Desired state

TypeScript is for internal implementation only. It does NOT affect ES users, but should improve TS integration for TS users.
The desired state is that Vue Storefront Core outputs JS libraries, it's written using some TypeScript features, but all the user code (themes, extensions) is still JavaScript. No TypeScript experience is required to build Vue Storefront stores. **This is just for core developers and transparent to the end users.**

Therefore we're only refactoring:
- core/api
- core/store
- core/lib

where it makes sense. The key TypeScript feature we feel is usable are data types.

We're in the middle of [refactoring `core/components` to `core/api` modules](https://github.com/DivanteLtd/vue-storefront/issues/1213). All the modules should be created using TypeScript

### The Action Plan:

1. Introduce types - move _.js modules to _.ts modules incrementally without breaking changes.
2. Use types when it's appropriate in your newly written modules and new features.
3. One Vuex module or just a few components refactored within one release (once a month) is fine.
4. All `core/api` modules should be created using TypeScript.
5. All new modules and Vuex stores should be created using TypeScript.
6. **For now, please don't refactor the existing UI layer (components, pages) to use TypeScript. We should focus on Vuex, core libraries, and APIs at first to not introduce chaos into theme development.**
7. We should put the types/interfaces inside `core/store/types` for all Entity/Data related models or in `core/types` for some shared ones—for example: `Product.ts` should be placed in `core/store/types/product/Product.ts`
8. We should use a minimal possible set of interfaces. Try to introduce one or two interfaces per entity (e.g. Product shouldn't be represented by more than two interfaces).
