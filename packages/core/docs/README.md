# Introduction

[[toc]]

## What is Vue Storefront?

_Vue Storefront_ is a ___platform-agnostic e-commerce PWA frontend framework___ that can work with any e-commerce backend API. Additionally, thanks to _low coupling and high cohesion_, it can connect to other services, giving you the freedom to work with the technologies you know and love, be it CMS, ERP, PIM, or anything else.

<center>
<img src="./images/diagram-general.png" />
</center>

That's a mouthful, so let's break it down:
 - __platform-agnostic__ - we made it possible to work with any platform and service you already use, as long as it has an API like REST or GraphQL.
 - __e-commerce__ - today's shops are much more than just products and carts. That's why we made it easy to integrate other types of services, such as helper service for ERP, versatile search features for PIM, portable checkout for 3rd party payment kiosk, and more.
 - __PWA__ - it's the technology of the future, designed to give the best performance on any device, with native-like features to satisfy your customer's needs.
 - __frontend framework__ - _Vue Storefront_ is a set of modular features, glued together using _interfaces_ and _factories_ and powered by [Nuxt.js](https://nuxtjs.org/).

## Problems Vue Storefront solves

The main purpose of any software is to solve problems and Vue Storefront is no different. We're doing our best to find common issues in the eCommerce space and find viable and scalable solutions. Below you can find just a few.

### Long time to market

Headless eCommerce frontends are complex and developing them can take a lot of time. 

**Solution**

With Vue Storefront you're getting a performant frontend connected to headless e-commerce, CMS, and other third-party platforms of your choice, along with hundreds of ready-to-use Vue Storefront and Nuxt.js modules for all common functionalities. Thanks to them, you will save hundreds (or even thousands) of working hours, so you can focus on creating value for your product while leaving the heavy lifting to us!

### Slow, unresponsive online shop

By some estimates, up to 1% of users will leave your website for every 100ms of delay in page load time. No matter how great your products are, a slow and unresponsive shop will make your conversion significantly lower.

**Solution**

We solved these issues by:
- using modern technologies for small bundle sizes and performance;
- using code splitting, lazy loading, and lazy hydration to load only what's needed at the moment;
- caching the resources, so the already visited pages are loaded instantly;
- preloading resources that might be needed in the future;
- hosting and executing as much as possible on the server, so the part served to the users is much lighter and faster compared to traditional SPA;

### Unwieldy architectural decisions

It can be incredibly hard to add or remove simple features when the code doesn't follow industry standard patterns and conventions. Even a simple bugfix or security update can be a very time-consuming task.

**Solution**

We are promoting good architectural decisions by providing an opinionated way of building eCommerce frontends based on years of experience. Whatever issues you could run into, we made sure that our modular and flexible architecture will handle them.

### Painful or impossible migrations

It can be frustrating when the technology you choose turned out to not fit your business needs, be it feature- or cost-wise. It can be even worse if you can't change it at all or the cost outweighs the benefits.

**Solution**

From the very beginning, Vue Storefront was designed to be backend-agnostic. This means that all eCommerce backends are integrated on the frontend under common interfaces and can be replaced without having to rewrite the frontend from scratch. Most technologies are completely different on the backend but are very similar from the frontend perspective, so we made abstractions that will make your migrations painless.

### Lack of platform-specific competencies

So your Magento department is not doing well, but the commercetools one is growing like crazy? If only you could move developers from one department to another...

**Solution**

With Vue Storefront you can! We have common interfaces for all integrations of the same type (eCommerce, CMS, Loyalty, etc.), so once a developer learns Vue Storefront they can be confident with any tech stack that works with it.

### Lack of flexibility

Do you recall the frustration when it wasn't possible to implement your dream design or feature within your backend platform, or adding a single modal window took few days?


**Solution**

You will forget about these issues with Vue Storefront! For the best experience, we divided the system into small and modular chunks. All parts are individual `npm` packages, so switching from one version to another should be as easy as any package installation.
Vue Storefront was built on the firm ground of _microservice_ architecture. Each of these packages is independent and optional, so you decide how much of the framework you want to utilize. Moreover **there are absolutely no limitations in terms of UI customization**. Your theme is just a regular Nuxt.js project, which you can customize to any degree.

## eCommerce Integrations

Vue Storefront is a frontend framework, so it needs an e-commerce backend. You can see the list of supported e-commerce platforms on the [integrations page](./integrations).

## Tech stack

The speed and flexibility of Vue Storefront wouldn't be possible without the great technologies that power it:

- [Vue.js](https://vuejs.org/v2/guide/)
- [Nuxt.js](https://nuxtjs.org/guide)
- [SCSS](https://sass-lang.com/)
- [Storefront UI](https://www.storefrontui.io/) (optional)
- [TypeScript](https://www.typescriptlang.org/docs/home) (optional)
- [Cypress](https://www.cypress.io/) (optional)

## What's next?

If you're already convinced to use Vue Storefront, check the [Installation guide](./general/installation.html).

If you want to learn more, check the [Key concepts](./general/key-concepts.html) behind Vue Storefront.
