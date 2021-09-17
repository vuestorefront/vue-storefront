# Key concepts

This document will walk you through the most important concepts of Vue Storefront and help you understand the ideas behind it.


## Progressive technology

It comes as no surprise that Vue Storefront is mostly based on Vue-related technologies. The most important one is Nuxt.js, which is built on top of Vue.js. While Vue.js provides tools to create user interfaces and 
templates, Nuxt.js takes care of server-side rendering, routing, and internationalization.

It is recommended to get familiar with [Vue.js](https://vuejs.org/) and [Nuxt.js](https://nuxtjs.org/)
before starting development in Vue Storefront.

## Reusability

To provide customizable and easy to maintain applications, Vue
Storefront offers composables. 
**Composables are the main public API of Vue Storefront** and, in many cases, the only API you'll work with. They are functions that implement most of the business logic of the application. You can treat each composable as an independent micro-application.

```js
const { search, product, loading, error } = useProduct();
```

You can read more about them on the [Composables](/guide/composables.html) page.

## Extendability and custom integrations

Although some integrations are already provided by the Vue Storefront team, we enable developers to create their own integrations with any platform by extending the Server Middleware. It's the key component that works as a bridge between the frontend and your backend of choice.

You can read more about Vue Storefront Middleware and its configuration on the [Server Middleware](/advanced/server-middleware.html)
page.

## Easy configuration

We did our best to keep the configuration as simple and intuitive as possible. Therefore, Vue Storefront
applications can be configured by modifying just two files:

- `nuxt.config.js` - main Nuxt.js configuration file used to control your Nuxt App and frontend-related features of Vue Storefront;
- `middleware.config.js` - VSF-specific configuration file used to add, configure and extend the [Server Middleware](/advanced/server-middleware.html);

You can read more about it on the [Configuration](/guide/configuration.html) page.

## Backend-agnostic

One of the main goals of Vue Storefront is to work with almost any platform while using the same API.
No matter which service you configure as a backend, you will always use the same getters and composables.
This makes it easy to work with VSF projects on different tech stacks or to try new services without making any heavy investments.

Some things are different for each platform, though. The main data object of each composable
(like `products` in `useProduct`) is **always** a plain response from your platform. However, if you use these objects with their dedicated getters (like `productGetters` for `useProduct`), they will always return the data in the same format.

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
