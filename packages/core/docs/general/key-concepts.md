# Key Concepts

This document will walk you through the most important concepts of Vue Storefront. Once you'll grab the ideas behind the software it should be fairly straightforward for you to use it in the right way.

## Configuration

The first thing you usually want to do after setting up a new project is some configuration. No matter if you want to change your backend API credentials, change routes or add a custom logger, there is always a single place to do all these things - Vue Storefront Modules configuration in `nuxt.config.js`.

If you're using our boilerplate, you will find 3 Vue Storefront modules in your configuration:

- `@vue-storefront/nuxt` - Our core Nuxt module. Its main responsibility is to extend Nuxt configuration.
- `@vue-storefront/nuxt-theme`- This module adds routing and theme-specific configuration for Nuxt.
- `@vue-storefront/<ECOMMERCE_PLATFORM>` - This is a module of your eCommerce integration. All configuration related to the specific eCommerce platform like setting up API credentials has to happen through this module. Such module usually provides some additional functionalities like setting up the cookies.

You can read more about configuration [here](/guide/configuration.html)

## Composables

::: tip Composables? Is this a French meal?
Composable is a function that uses [Vue.js Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) under the hood. It's commonly named with a `use` prefix (eg. `useProduct`, `useCart`). This convention comes from the React community where we can find a very similar pattern - [Hooks](https://reactjs.org/docs/hooks-intro.html), which inspired Vue.js core team to introduce the Composition API. If you are not familiar with this concept, we strongly recommend checking the basics of it [here](https://v3.vuejs.org/guide/composition-api-introduction.html)
:::

**Composables are the main public API of Vue Storefront** and in many cases the only API except configuration you'll work with.

You can treat each composable as an independent micro-application. They manage their own state, handle SSR and in most cases don't interact with each other (`useUser` and `useCart` are exceptions).

```js
const { search, product, loading, error } = useProduct();
```

Vue Storefront integrations are exposing the following composables:

#### Product Catalog

- [useProduct](/composables/use-product) for managing a single product with variants (or a list)
- [useCategory](/composables/use-category) for managing category lists (but not category products)
- [useFacet](/composables/use-facet) for complex catalog search with filtering
- [useReview](/composables/use-review) for product reviews

#### User Profile and Authorization

- [useUser](/composables/use-user) for managing user sessions, credentials and registration
- [useUserShipping](/composables/use-user-shipping) for managing shipping addresses
- [useUserBilling](/composables/use-user-billing) for managing billing addresses
- **useUserOrders** for managing past and active user orders

#### Shopping Cart

- [useCart](/composables/use-cart) for loading the cart, adding/removing products and discounts

#### Wishlist/Favourite

- [useWishlist](/composables/use-wishlist) for loading the wishlist, adding/removing products

#### CMS Content

- [useContent](/composables/use-content) for fetching the CMS content. It is usually used in combination with `<RenderContent>`component

#### Checkout

- **useCheckout** for saving the shipping and billing address for a current order, choosing a shipping method, making payments, and placing the order

#### Other

- [useVSFContext](/general/context) for accessing the integration API methods and client instances

In a real-world application, these composables will most likely use different backend services under the hood yet still leverage the same frontend API. For instance within the same application `useProduct` and `useCategory` could use `commercetools`, `useCart` some ERP system, `useFacet` - Algolia etc.

You can read more about Vue Storefront composables [here](guide/composables.html)

## Routing

Routes are injected via `@vue-storefront/nuxt-theme` module. Use [extendRoutes](https://nuxtjs.org/guides/configuration-glossary/configuration-router#extendroutes) from `nuxt.config.js` to modify them.

## Internationalization

By default, we're using `nuxt-i18n` module for internationalization. 

You can read more about i18n in Vue Storefront [here](/advanced/internationalization).

## App Context

Sometimes the only thing you need is to fetch some data from integrations API Client without the overlap of a composable. You should use an API Client that is accessible through `useVSFContext` composable for that. 

```js
import { useVSFContext } from '@vue-storefront/core'
// for each integration you can access it's tag - eg $ct for commercetools
const { $ct } = useVSFContext()
```

You can read more about Vue Storefront Context [here](/advanced/context)

## Integrations

Even though high-level APIs are the same for all Vue Storefront integrations they're different on the low level (data formats, search params). Check the docs of a specific platform on the left side under "eCommerce integrations" tab to learn about them.
