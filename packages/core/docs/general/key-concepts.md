# Key Concepts

This document will walk you through the most important concepts of Vue Storefront. Once you'll grab the ideas behind the software it should be fairly easy for you to use it in the right way.

## Composables

::: tip Vue Composables? Is this a French meal?
Composable is a function that uses Vue.js Composition API under the hood with some Vue-related business logic inside of it. It's commonly named with a `use` prefix (eg. `useProduct`, `useCart`). This convention comes from the React community where we can find a very similar pattern - Hooks which inspired Vue.js core team to introduce the Composition API.
:::

**Composables are the main public API of Vue Storefront** and in many cases the only API you'll work with.