# Extending Vue Storefront

## Introduction

Extendability is one of the key selling points for many frameworks, and Vue Storefront is no different. When implemented well, it enables flexibility to meet the requirements of most, even very diverse projects. On this page, we will walk through possible ways of extending Vue Storefront if core functionalities are not enough for your project.

First, you should consider which part of the application you need to extend - frontend, backend, or both. Depending on your needs, you may be interested in extending:

- [Vue.js](#extending-vue-js)
- [Nuxt.js](#extending-nuxt-js)
- [Server Middleware](#extending-server-middleware)

## Extending Vue.js

Plugins allow adding global-level functionalities to Vue.js, such as components, methods, helpers, or directives. These mainly extend the frontend portion of the application and can be divided into two categories:

- UI plugins;
- Non-UI plugins;

:::tip Using Vue.js plugins in Nuxt.js project
See the [Nuxt.js plugins](#nuxt-js-plugins) section to see more information on using Vue.js plugins in the Nuxt.js project. 
:::

### Vue.js UI plugins

UI plugins extend how the application looks or behaves on user interactions. They include plugins that add support for:

- event handling;
- responsive design, resizing, scrolling, and animations;
- handling forms and validation;
- routing, lazy loading, lazy hydration, meta tags;

For a list of Vue.js UI utilities, see the [UI Utilities](https://github.com/vuejs/awesome-vue#ui-utilities) section in [Awesome Vue.js](https://github.com/vuejs/awesome-vue) repository.

### Vue.js non-UI plugins

Non-UI plugins extend how the application works under the hook or handles state and storage. They include plugins that add support for:

- making HTTP requests;
- internationalization (i18n);
- custom events;
- persistence (storage);
- state management;
- web workers;

For a list of Vue.js UI utilities see the [Utilities](https://github.com/vuejs/awesome-vue#utilities) section in [Awesome Vue.js](https://github.com/vuejs/awesome-vue) repository.

## Extending Nuxt.js

Nuxt.js offers two ways of extending its functionalities:

- plugins;
- modules and build modules;

These can extend both the frontend and backend portions of the application.

### Nuxt.js plugins

Nuxt.js calls plugins before creating the root Vue.js application. Plugins can be client-only, server-only, or on both client and server. You can use them to register Vue.js plugins.

See the [Plugins directory](https://nuxtjs.org/docs/2.x/directory-structure/plugins) page in Nuxt.js documentation to learn more about them.

### Nuxt.js modules and build modules

Nuxt.js modules can customize almost any aspect of your project. They are functions called sequentially when the Nuxt.js application is booting. You can use them to:

- add support for various UI frameworks;
- enable PWA, amp;
- optimize images and other static assets;
- create a sitemap, generate `robots.txt` file or meta tags for social media platforms;
- registering various HTTP clients, such as axios or Apollo;
- add Google Tag Manager, Google GTag;
- integrate with CSM's, payment providers, error monitoring software;

See the [Modules](https://nuxtjs.org/docs/2.x/directory-structure/modules) page in Nuxt.js documentation to learn more about them and [Explore Nuxt Modules](https://modules.nuxtjs.org/) page to see a list of available modules.

## Extending Server Middleware

As you might have read on a page dedicated to the [Server Middleware](/advanced/server-middleware.html), it's an Express proxy that handles traffic between your application and external services, such as eCommerce or CMS platforms. Server Middleware configuration allows to:

- register integrations;
- extend existing integrations using extensions;

Integrations and extensions for Server Middleware are server-only.

### Server Middleware integrations

Server Middleware integrations connect Vue Storefront applications with other external services. For example, all eCommerce and CMS integrations listed on [Integrations](/integrations/) page are in fact Server Middleware integrations.

See the [Server Middleware](/advanced/server-middleware.html) page to learn more about them and [Integrating eCommerce platform](/integrate/integration-guide.html) page if you want to create your integration.

### Server Middleware extensions

Server Middleware extensions add or modify functionalities of already existing Server Middleware integrations. They may extend the Express.js server, register additional API endpoints, or inject into the lifecycle of a request.

See the [Extending integrations](/integrate/integration-guide.html) page to learn more about them.
