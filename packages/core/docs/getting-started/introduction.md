# Introduction to Vue Storefront

If you followed our [Installation](/general/installation.html) guide, you should have a Vue Storefront project with some eCommerce platform already integrated. It has a bunch of folders, Vue components and files, but what does what?

In this section we will discribe how to navigate around the Vue Storefront project and how to get start development.

## It's all Nuxt.js

Before we can dive deep into the project itself, we need to understand what powers it all. **Vue Storefront is essentially a [Nuxt.js](https://nuxtjs.org/) project with some plugins and modules preinstalled, as well as ready-to-use e-commerce theme.**

Some of the plugins and modules that come with the fresh installation are created by the Nuxt.js community, some are created by our core team and are created specifically for Vue Storefront project.

The default theme mainly consists of components from the [Storefront UI](http://storefrontui.io/) — e-commerce focused UI library maintained by the Vue Storefront team.

Plugins, modules and the theme are described in detail in following sections.

## But why?

You might be wondering why we choose Nuxt.js as our foundation. After all, it was not created with e-commerce in mind.

When you start using any new framework, you expect it to have **plugins that solve common issue**, such as:

* analytics,
* SEO,
* PWA,
* internationalization,
* CSS frameworks such as Tailwind or Bootstrap,
* and many, many more.

Additionally you expect it to be **versatile and flexible** enough to allow extending it and creating custom integrations.

Big plus is also an **active and diverse community**, which helps when you get stuck.

Nuxt.js is the biggest Vue.js framework and has all of the above — it has a big library of [ready-to-use modules](https://modules.nuxtjs.org/), can be easily extended and has tens of thousands of people on [Nuxt.js Discord server](https://discord.com/invite/ps2h6QT).
