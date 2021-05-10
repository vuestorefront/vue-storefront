# Key concepts

This document will walk you through the most important concepts of Vue Storefront, help you understand the ideas behind it and how to use them in the right way.

## Configuration

There are two types of configuration in Vue Storefront:

- `nuxt.config.js` to control your Nuxt App and frontend-related features of Vue Storefront;
- `middleware.config.js` to add, configure and extend your integrations;

You can read more about it on the [Configuration](/guide/configuration.html) page.

## Composables

::: tip Composables? Is this a French meal?
Composable is a function that uses [Vue.js Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) under the hood. It's commonly named with a `use` prefix (eg. `useProduct`, `useCart`). This convention comes from the React community which has a similar pattern called [Hooks](https://reactjs.org/docs/hooks-intro.html), which inspired Vue.js core team to introduce the Composition API. If you are not familiar with this concept, we strongly recommend checking the basics in the official  [Vue.js documentation](https://v3.vuejs.org/guide/composition-api-introduction.html).
:::

**Composables are the main public API of Vue Storefront** and in many cases the only API except configuration you'll work with.

You can treat each composable as an independent micro-application. They manage their state, handle SSR and in most cases don't interact with each other (`useUser` and `useCart` are the exceptions).

```js
const { search, product, loading, error } = useProduct();
```

You can read more about them on the [Composables](/guide/composables.html) page.

## Routing

Out of the box, some routes are injected via `@vue-storefront/nuxt-theme` module:

- Home Page (`/`);
- Category Page (`/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?`);
- Product Page (`/p/:id/:slug/`);
- User Profile Page (`/my-account/:pageName?`);
- Checkout (`/checkout`):
  - Shipping (`/checkout/shipping`);
  - Billing (`/checkout/billing`);
  - Payment (`/checkout/payment`);
  - Thank You page (`/checkout/thank-you`);
- Custom 404 page;

Some [integrations](/integrations) may register additional routes. For example, CMS integrations often override Home Page and add custom, dynamic pages.

To override existing routes or adding your own, use [extendRoutes](https://nuxtjs.org/guides/configuration-glossary/configuration-router#extendroutes) in `nuxt.config.js`. Additionally, Nuxt.js automatically registers components created in the `pages` folder as new routes. You can read more about this on the [File System Routing](https://nuxtjs.org/docs/2.x/features/file-system-routing/) page.

## Internationalization

By default, Vue Storefront uses `nuxt-i18n` module for internationalization. 

You can read more about it on the [Internationalization](/advanced/internationalization) page.

## Server Middleware

Vue Storefront uses middleware as a bridge between the frontend and the backends (eCommerce or 3rd party services). The frontend always calls middleware that forwards requests to corresponding destinations. It allows developers to implement custom logic, inject into the lifecycle of the requests or even create custom API endpoints if needed.

Middleware by default is a part of your Nuxt application, but it can be detached and used as a separate node application.

You can read more about Vue Storefront Middleware on the [Server Middleware](/advanced/server-middleware) page.

## Integrations and extendibility

All 3rd party integrations (eCommerce, CMS, Search, etc.) can be added and configured in `middleware.config.js`:

```js
//middleware.config.js
module.exports = {
  integrations: {
    // ...
  }
}
```

Each integration has an `extensions` field. You can use extensions to:
- override existing API methods of a certain integration;
- add new API methods;
- change method parameters before they are called;
- react to a method being called;

```js
{
  name: 'my-extension',
  extendApiMethods: {
    // will override default getProduct
    getProduct: async () => { /* ... */ }
    // will add new method to the integration 
    doSomethingMore: async () => { /* ... */}
  },
  hooks: (req, res) => {
    return {
      beforeCreate: ({ configuration }) => configuration,
      afterCreate: ({ configuration }) => configuration,
      beforeCall: ({ configuration, callName, args }) => args,
      afterCall: ({ configuration, callName, args, response }) => response
    }
  }
}
```

Sometimes you just need to call a specific API client method without using a composable. Luckily you have access to all API methods of the registered integrations through `useVSFContext` composable. 

The composable returns a list of tags representing your integrations (it's usually either a name of the integration like `$storyblok` or an acronym for longer names like `$ct` for commercetools).

```js
const { $ct } = useVsfContext()
```

You have access to all methods through the `api` field of each integration

```js
const products = $ct.api.getProducts(params)
```

## Backend-agnostic

Whatever backend services you're using, they are handled more or less the same way on the frontend. No matter what eCommerce platform, CMS, or search platform you're using, you will always use the same getters and composables. This makes it easy to work with VSF projects on different tech stacks or try new services without making heavy investments.

Some things are different for each platform though. The main data object of each composable (like `products` in `useProduct`) is **always** a plain response from your platform. If you use getters on this object they will always return agnostic data format

```js
const { search, products } = useProduct()

console.log(products) // type: CommerceToolsProduct[]

console.log(productGetters.getAttributes(products.value)) // type: AgnosticProductAttribute[]
```

Parameters of functions returned by composables are different for each platform

```js
const { search, products } = useProduct()

search(params)  // `params` are different depending on backend platform
```
