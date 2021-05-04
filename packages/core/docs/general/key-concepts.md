# Key concepts

This document will walk you through the most important concepts of Vue Storefront, help you understand the ideas behind it and how to use them in the right way.


## Progressive technology

It comes as no surprise that Vue Storefront is mostly based on Vue-related technologies: [Vue.js](https://vuejs.org/i) itself,
and [Nuxt.js](https://nuxtjs.org/), which is built on top of it. Where Vue.js provides tools to create user interfaces and templates, Nuxt.js takes care of
server-side rendering, routing, and internationalization.

It is recommended to get familiar with Vue.js and Nuxt.js before starting development in Vue Storefront.

## Easy configuration

We did our best to keep configuration as simple and intuitive as possible. Therefore, Vue Storefront applications
can be configured by modifying just two files:

- `nuxt.config.js` - main Nuxt.js configuration file - to control your Nuxt App and frontend-related features of Vue Storefront;
- `middleware.config.js` - VSF-specific config file - to add, configure and extend your integrations;

You can read more about it on the [Configuration](/guide/configuration.html) page.

## Reusability

To provide all necessary tools to create customizable and easy to maintain applications, Vue Storefront
offers composables - functions that implement most of business logic of the application.

**Composables are the main public API of Vue Storefront** and in many cases the only API you'll work
with. You can treat each composable as an independent micro-application. They manage their state,
handle SSR and in most cases don't interact with each other.

```js
const { search, product, loading, error } = useProduct();
```

You can read more about them on the [Composables](/guide/composables.html) page.

## Extendability and custom integrations

Though some 3rd parties integrations are already covered and available in Vue Storefront repositories 
and registers, Vue Storefront enables developers to create their own integrations with both eCommerce
and CMS platforms by extending Server Middleware functionality - one of the key components that works
as a bridge between frontend and the backends.

You can read more about Vue Storefront Middleware and its configuration on the [Server Middleware](/advanced/server-middleware)
page.

## Backend-agnostic

Whatever backend services you're using, they are handled more or less the same way on the frontend. 
No matter what eCommerce platform, CMS, or search platform you're using, you will always use the same
getters and composables. This makes it easy to work with VSF projects on different tech stacks or try
new services without making heavy investments.

Some things are different for each platform though. The main data object of each composable
(like `products` in `useProduct`) is **always** a plain response from your platform. If you use
getters on this object they will always return agnostic data format

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
