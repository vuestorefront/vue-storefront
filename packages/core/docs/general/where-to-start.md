# Where to start?

This document will show where you should start if you are:

[[toc]]

## Considering using Vue Storefront

Vue Storefront is a **platform-agnostic e-commerce PWA frontend framework** that can work with any eCommerce backend API. Sounds great, right? But that is not all.

With our product, you can easily solve the most common problems in the eCommerce e.g.
- [Long time to market](/#long-time-to-market)
- [Slow, unresponsive online shop](/#slow-unresponsive-online-shop)
- [Unwieldy architectural decisions](/#unwieldy-architectural-decisions)
- [Painful or impossible migrations](/#painful-or-impossible-migrations)
- [Lack of platform-specific competencies](/#lack-of-platform-specific-competencies)
- [Lack of flexibility](/#lack-of-flexibility)

Also, we are proud of:
- 300+ [Live Implementations](https://www.vuestorefront.io/live-projects)
- 100+ [Agency Partners](https://www.vuestorefront.io/partner-agencies)
- active [Discord community](http://discord.vuestorefront.io/)

You can visit [Introduction](/) or [Key conepts](/general/key-concepts.html) pages for more details about Vue Storefront. 

**Introduction** section will guide you through:
- [What is Vue Storefront?](/#what-is-vue-storefront)
- [Problems Vue Storefront solves](/#problems-vue-storefront-solves)
- [eCommerce integrations](/#ecommerce-integrations)
- [Tech stack](/#tech-stack)
- [What's next](/#what-s-next)

**Key concepts** section will guide you through:
- [Progressive technology](/general/key-concepts.html#progressive-technology)
- [Reusability](/general/key-concepts.html#reusability)
- [Extendability and custom integrations](/general/key-concepts.html#extendability-and-custom-integrations)
- [Easy configuration](/general/key-concepts.html#easy-configuration)
- [Backend-agnostic](/general/key-concepts.html#backend-agnostic)

## Developer creating a shop

As a developer, you will be creating a shop from scratch to ready for production. Vue Storefront aims to meet the expectations of developers and guide you helping smoothly through all these steps.

You should start by familiarizing yourself with the **Guides** category. It includes all you need to know to create a shop successfully. If you want to dive deeper, check out the **Advanced** category.

**Guides** section will guide you through:
- [Theme](../guide/theme.html)
- [Configuration](../guide/configuration.html)
- [Composables](../guide/composables.html)
- [Getters](../guide/getters.html)
- [Product catalog](../guide/product-catalog.html)
- [Authentication](../guide/authentication.html)
- [User profile](../guide/user-profile.html)
- [Cart and Wishlist](../guide/cart-and-wishlist.html)
- [Checkout](../guide/checkout.html)

**Advanced** section will guide you through:
- [Architecture](../advanced/architecture.html)
- [Application context](../advanced/context.html)
- [Calling platform API](../advanced/calling-platform-api.html)
- [Extending GraphQL Queries](../advanced/extending-graphql-queries.html)
- [Server Middleware](../advanced/server-middleware.html)
- [Internationalization](../advanced/internationalization.html)
- [Performance](../advanced/performance.html)
- [SSR Cache](../advanced/ssr-cache.html)
- [Logging](../advanced/logging.html)
- [API Reference](../core/api-reference/)

To be up to date, we recommend following our [Roadmap](https://www.notion.so/vuestorefront/Vue-Storefront-2-Next-High-level-Roadmap-201cf06abb314b84ad01b7b8463c0437) and joining our [Discord community](http://discord.vuestorefront.io/).

## Integrator

If you are using a custom backend or want to use platforms or technologies not listed on our [Integrations](../integrations/) page, you likely need to create an integration.

Vue Storefront integrates with a wide range of technologies and each has its own needs, so there is no generic tutorial for all of them.

However, depending on the kind of integrations you want to build, you should familiarize yourself with **Building Integration** section. Especially integration guide for [eCommerce](../integrate/integration-guide.html) and [CMS](../integrate/cms.html) platforms.

**eCommerce** section will guide you through: 
- [Introduction](../integrate/integration-guide.html#introduction)
- [Scope](../integrate/integration-guide.html#scope)
- [Getting started](../integrate/integration-guide.html#getting-started)
- [Creating an api-client](../integrate/integration-guide.html#creating-an-api-client)
- [Creating composables](../integrate/integration-guide.html#creating-composables)
- [Creating getters](../integrate/integration-guide.html#creating-getters)
- [Creating a theme](../integrate/integration-guide.html#creating-a-theme)

**CMS** section will guide you through:
- [configuration / content fetching / content rendering](../integrate/cms.html#what-is-needed)
- [usage example in the real application](../integrate/cms.html#usage-example-in-the-real-application)

## Designer creating a theme

Vue Storefront default theme is mostly based on Single UI components turned into a powerful design system for e-commerce we called [Storefront UI](https://www.storefrontui.io/)

If you don't want to use [Storefront UI](https://www.storefrontui.io/) (it's just a UI layer), the project can work with any other UI library or a custom code. So it totally depends on you - create your own theme, edit the existing one or use our default theme.

At the start you should familiarize yourself with the specially prepared [theme](../guide/theme.html) guide.

**Theme** section will guide you through:
- [Directory structure](../guide/theme.html#directory-structure)
- [Storefront UI](../guide/theme.html#directory-structure)
- [How to customizing the theme](../guide/theme.html#customizing-the-theme)
- [Routing](../guide/theme.html#routing)
- [How to updating styles](../guide/theme.html#updating-styles)
- [Preinstalled modules and libraries](../guide/theme.html#preinstalled-modules-and-libraries)
