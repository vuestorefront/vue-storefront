# Extending Vue Storefront

## Introduction

Extensibility is one of the key selling points of many frameworks, and Vue Storefront is no exception. There is a good reason for this - at some point, most projects need to extend the base of the framework to meet their needs, be it with a ready-to-use or a custom plugin. Well-thought-out extensions or plugins system enables flexibility to meet the demands of the most, even very diverse projects. On this page, we will discuss possible ways to extend Vue Storefront if the basic features are not enough for your project.

First, you should consider which part of the application you need to extend - frontend, backend, or both. Depending on your needs, you may need to extend:

- [Vue.js](#extending-vue-js)
- [Nuxt.js](#extending-nuxt-js)
- [Server Middleware](#extending-server-middleware)

In the sections below, we describe when and how to extend each of them. Some also have links to ready-to-use extensions created by framework authors or the community to save you time.

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

For a list of Vue.js UI plugins, see the [UI Utilities](https://github.com/vuejs/awesome-vue#ui-utilities) section in [Awesome Vue.js](https://github.com/vuejs/awesome-vue) repository.

### Vue.js non-UI plugins

Non-UI plugins extend how the application works under the hood or handles state and storage. They include plugins that add support for:

- making HTTP requests;
- internationalization (i18n);
- custom events;
- persistence (storage);
- state management;
- web workers;

For a list of Vue.js UI plugins see the [Utilities](https://github.com/vuejs/awesome-vue#utilities) section in [Awesome Vue.js](https://github.com/vuejs/awesome-vue) repository.

## Extending Nuxt.js

Nuxt.js offers two ways of extending its functionalities:

- plugins;
- modules and build modules;

### Nuxt.js plugins

Nuxt.js imports plugins in browser (client-only), server (server-only), or both before creating the root Vue.js application. For this reason, you can use them to register Vue.js plugins.

See the [Plugins directory](https://nuxtjs.org/docs/2.x/directory-structure/plugins) page in Nuxt.js documentation to learn more.

### Nuxt.js modules and build modules

Nuxt.js modules can customize almost any aspect of your project. They are functions called sequentially on the server when the Nuxt.js application is booting.

You can use them to:

- register Nuxt.js plugins;
- add support for various UI frameworks;
- enable PWA or AMP;
- optimize images and other static assets;
- create a sitemap, generate `robots.txt` file or meta tags for social media platforms;
- registering various HTTP clients, such as axios or Apollo;
- add Google Tag Manager, Google GTag;
- integrate with CMSs, payment providers, error monitoring software;

See the [Modules](https://nuxtjs.org/docs/2.x/directory-structure/modules) page in Nuxt.js documentation to learn more and [Explore Nuxt Modules](https://modules.nuxtjs.org/) page to see a list of available modules.

## Extending Server Middleware

As you might have read on a page dedicated to the [Server Middleware](/architecture/server-middleware.html), it's an Express proxy that handles traffic between your application and external services, such as eCommerce or CMS platforms. Server Middleware configuration allows to:

- register integrations;
- extend existing integrations using extensions;

Integrations and extensions for Server Middleware are run only on the server.

### Server Middleware integrations

Server Middleware integrations connect Vue Storefront applications with other external services. For example, all eCommerce and CMS integrations listed on the [Integrations](/integrations/) page are Server Middleware integrations.

See the [Server Middleware](/architecture/server-middleware.html) page to learn more and [Integrating eCommerce platform](/integrate/integration-guide.html) page if you want to create your integration.

### Server Middleware extensions

Server Middleware extensions add or modify functionalities of already existing Server Middleware integrations. They may extend the Express.js server, register additional API endpoints, or inject into the lifecycle of a request.

See the [Extending integrations](/integrate/integration-guide.html) page to learn more.
