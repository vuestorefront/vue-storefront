# Introduction to Vue Storefront

If you followed our [Installation](/general/installation.html) guide, you should have a Vue Storefront project with some eCommerce platform already integrated. It has a bunch of folders, Vue components and files, but what does what?

In this section we will discribe how to navigate around the Vue Storefront project and how to get start development.

## It's all Nuxt.js

Before we can dive deep into the project itself, we need to understand what powers it all. **Vue Storefront is essentially a Nuxt.js project with some plugins and modules preinstalled, as well as ready-to-use e-commerce theme.**

Some of the plugins and modules that come with the fresh installation are created by the Nuxt.js community, some are created by our core team and are created specifically for Vue Storefront project.

The default theme mainly consists of components from the [Storefront UI](http://storefrontui.io/) — e-commerce focused UI library maintained by the Vue Storefront team.

Plugins, modules and the theme are described in detail in following sections.

## But why?

You might be wondering why we choose Nuxt.js as our foundation. After all, it was not created with e-commerce in mind.

We were very happy about using Vue.js to create Vue Storefront 1. It's very well documented, performance and easy to pick up framework. However, creating a custom framework meant that everything had to be implemented from scratch either by us or our community.

When you start using any new framework, you expect it to have plugins that solve common issue, such as:

* analytics,
* PWA,
* internationalization,
* CSS frameworks such as Tailwind or Bootstrap,
* and many, many more.


