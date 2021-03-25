# Key Concepts

This document will walk you through the most important concepts of Vue Storefront. Once you'll grab the ideas behind the software it should be fairly straightforward for you to use it in the right way.

## Configuration

There are two types of configuration in Vue Storefront:

- `nuxt.config.js` which controls your Nuxt App and frontend-related features of Vue Storefront
- `middleware.config.js` where you add, configure and extend your integrations

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
You can read more about Vue Storefront composables [here](/guide/composables.html)

## Routing

Routes are injected via `@vue-storefront/nuxt-theme` module. Use [extendRoutes](https://nuxtjs.org/guides/configuration-glossary/configuration-router#extendroutes) from `nuxt.config.js` to modify them.

## Internationalization

By default, we're using `nuxt-i18n` module for internationalization. 

You can read more about i18n in Vue Storefront [here](/advanced/internationalization).

## Middleware

Vue Storefront uses a middleware that is a bridge between front-end and backends (eCommerce or 3rd party services). The front-end always calls middleware that is redirecting requests to correlated destinations. It allows developers to implement custom logic to inject into the lifecycle of the requests or even create custom API endpoints if needed.

Middleware by default is a part of your Nuxt application but it can be detached and server as a separate node application.

You can read more about Vue Storefront Middleware on the [Server Middleware](/advanced/server-middleware) page.


## Integrations and extendibility

All the 3rd party integrations (eCommerce, CMS, Search etc) can be added and configured through `middleware.config.js`.

```js
//middleware.config.js
module.exports = {
  integrations: {
    // ...
  }
}
```

Each integration has `extensions` field. You can use extensions to:
- Override existing API methods of a certain integration.
- Add new API methods.
- Change method parameters before each/specific it's called.
- Do something after each/specific method is called.

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

Sometime you just need to call specific API client method without using a composable. You have access to all API methods of your registered integrations through `useVSFContext` composable. 

The composable returns a list of tags representing your integrations (it's usually either a name of the integration like `$storyblok` or acronym for longer names like `$ct` for commercetools)

```js
const { $ct } = useVsfContext()
```

You have access to all methods through `api` field of each integration

```js
const products = $ct.api.getProducts(params)
```

## Backend-agnostic

No matter what backend services you're using they are handled more or less the same way on the frontend. No matter what eCommerce platform, CMS or Search you're using you will always use the same getters and composables so it's easy to work with VSF projects on different tech stacks or try new services without making heavy investments.

There are some things that are different for each platform though. Main data object of each composable (like `products` in `useProduct`) is **always** a plain response from your platform. If you use getters on this object they will always return agnostic data format

```js
const { search, products } = useProduct()

console.log(products) // type: CommerceToolsProduct[]

console.log(productGetters.getAttributes(products.value)) // type: AgnosticProductAttribute[]
```

Also parameters of functions returned by composables are different for each platform

```js
const { search, products } = useProduct()

search(params)  // `params` are different depending on backend platform
```