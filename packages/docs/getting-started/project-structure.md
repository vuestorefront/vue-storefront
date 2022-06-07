# Project structure

If you followed our [Installation](/getting-started/installation.html) guide, you should have a Vue Storefront project with some eCommerce platform already integrated. This project has a bunch of directories, Vue components, and files, but what does what?

In this section, you will learn how to navigate the Vue Storefront project and where to start developing.

## Structure basics

As described on the [Introduction to Vue Storefront](./introduction.html) page, Vue Storefront is just a Nuxt.js project under the hood. For this reason, our project structure inherits from Nuxt.js but has some additional files.

To learn about it in-depth, you can refer to the [Directory Structure in Nuxt.js project](https://nuxtjs.org/docs/get-started/directory-structure/) document, but the gist of it is:

* [**.nuxt**](https://nuxtjs.org/docs/2.x/directory-structure/nuxt) is a dynamically generated build directory. You should **not** manually modify it, nor synchronize it using version control like GIT.

* [**components**](https://nuxtjs.org/docs/2.x/directory-structure/components) contains Vue.js components used on different pages or parts of your application. You can import these components from pages, layouts, and other components.

* [**lang**](https://docs.vuestorefront.io/v2/getting-started/internationalization.html) contains translations for your application. Available locales are configured in the `nuxt.config.js` file.

* [**layouts**](https://nuxtjs.org/docs/2.x/directory-structure/layouts) contains Vue.js components that act as a UI base for the whole application or specific pages.

* [**middleware**](https://nuxtjs.org/docs/2.x/directory-structure/middleware) contains JavaScript files that contain custom functions run before rendering a whole application or just a specific layout or page. These can be used, for example, to protect pages from unauthorized access or redirect if some conditions are not met.

* [**pages**](https://nuxtjs.org/docs/2.x/directory-structure/pages) contains Vue.js components that Nuxt.js automatically registers as routes.

* [**static**](https://nuxtjs.org/docs/2.x/directory-structure/static) contains files that likely won't change, such as favicon, `robots.txt`, sitemap, or company logos.

* **middleware.config.js** and **nuxt.config.js** configurations file are described in detail in the [Configuration](./configuration.html) document.

Some integrations can have slightly different structures, with more or fewer files and directories. For more information, refer to the Nuxt.js documentation linked above and the integration documentation.

## What's next

With a basic understanding of the project structure, it's time to learn about the [Configuration](./configuration.html) files that control the application and installed integrations. They are a crucial part of every Vue Storefront application.
