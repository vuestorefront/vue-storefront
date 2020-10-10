# Key Concepts

This document will walk you through the most important concepts of Vue Storefront. Once you'll grab the ideas behind the software it should be fairly easy for you to use it in the right way.

## Configuration

The first thing you usually want to do after setting up a new project is some configuration. No matter if you want to change your backend API credentials, change routes or add a custom logger there is always a single place to do all these things - Vue Storefront Modules configuration in `nuxt.config.js`.

If you're using our boilerplate you will find 3 Vue Storefront modules in your configuration:
- `@vue-storefront/nuxt` - Our core Nuxt module. It's main responsibility is to extend Nuxt configuration. 
- `@vue-storefront/nuxt-theme`- This module adds routing and theme-specific configuration for Nuxt.
- `@vue-storefront/<ECOMMERCE_PLATFORM>` - This is a module of your eCommerce integration. All configuration related to specific eCommerce platform like setting up API credentials has to happen through this module. Such module usually provides some additional functionalities like setting up the cookies.

## Composables

::: tip Composables? Is this a French meal?
Composable is a function that uses Vue.js Composition API under the hood. It's commonly named with a `use` prefix (eg. `useProduct`, `useCart`). This convention comes from the React community where we can find a very similar pattern - Hooks which inspired Vue.js core team to introduce the Composition API.
:::

**Composables are the main public API of Vue Storefront** and in many cases the only API except configuration you'll work with.

You can treat each composable as an independent micro-application. They manage theyir own state, handle SSR and in most cases don't interact with each other (`useUser` and `useCart` are exceptions).

```js
const { search, product, loading, error } = useProduct()
```

Vue Storefront integrations are exposing following composables:

```js
// product catalog
useProduct()
useCategory()
useFacet()
useReview()

// user profile and authorization
useUser()
useUserShipping()
useUserBilling()
useUserOrders()
useInventory() // WIP

// shopping cart
useCart()

// wishlist/favourite 
useWishlist()

// CMS content
useContent() // usually external CMS

// checkout forms and placing orders
useCheckout()
```

## Routing

Routes are injected via `@vue-storefront/nuxt-theme` module. Use [`extendRoutes`](https://nuxtjs.org/guides/configuration-glossary/configuration-router#extendroutes) from `nuxt.config.js` to modify them.

## Internationalization

By default we're using `nuxt-i18n` module for internationalization. You can read more about i18n in Vue Storefront [here](./i18n).

<!-- ## Agnostic data formats and interfaces
-->