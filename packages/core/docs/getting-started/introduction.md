# Introduction to Vue Storefront

Without a proper understanding of the framework you're using, you might spend weeks or even months doing something that someone else has already done. That's why before we can dive deep into the project itself, we need to understand what powers it all under the hood.

@[youtube](MCN1rRwuIGs)

## It's all Nuxt.js

We didn't want to reinvent the wheel and introduce yet another framework that solves the same issues as its predecessors, which took them years to mature. That's why...

<q>

Vue Storefront is essentially a [Nuxt.js](https://nuxtjs.org/) project with some plugins and modules preinstalled, as well as a ready-to-use e-commerce theme. Nuxt.js handles most of the front-end work and [Server Side Rendering](https://nuxtjs.org/docs/concepts/server-side-rendering/), while Vue Storefront adds the e-commerce specific bits and integrations to various platforms.

</q>

Some of the plugins and modules that come with the fresh installation were created by the Nuxt.js community, and others come from our core team specifically for Vue Storefront projects.

The default theme mainly consists of components from the [Storefront UI](http://storefrontui.io/) — an e-commerce focused UI library maintained by the Vue Storefront team.

We described plugins, modules, and the theme in more detail on the following pages.

### But why?

You might be wondering why we choose Nuxt.js as our foundation. After all, it wasn't created with e-commerce in mind.

When you start using any new framework, you expect it to:

* have **plugins that solve common issues**, such as analytics, SEO, internationalization, etc.,
* be **versatile and flexible** enough to allow extending it and creating custom integrations,
* have **active and diverse community**, which answers questions, writes articles, and promotes the framework.

Creating such an ecosystem from scratch takes years. But because we based Vue Storefront on Nuxt.js — the biggest Vue.js framework — it ticks all the boxes. Nuxt.js has a vast library of [ready-to-use modules](https://modules.nuxtjs.org/) and an active community of thousands of developers on the [Nuxt.js Discord server](https://discord.com/invite/ps2h6QT). It's also flexible enough to make it e-commerce ready with just a few plugins and modules.

<q>

Combining general-purpose modules from Nuxt.js and e-commerce specific modules from Vue Storefront significantly shortens the time-to-market. It allows you to focus on what's specific to your project.

</q>

## Start with Vue.js

If you are new to the Vue.js ecosystem, the best place to start learning is the [Vue.js 2 documentation](https://v2.vuejs.org/). **In our documentation, we assume prior knowledge of Vue.js (with some exceptions)**. While we do our best to explain each topic in detail, a lack of this knowledge might cause you to get lost.

We also encourage reading [Nuxt.js 2 documentation](https://nuxtjs.org/docs/). In most places, we don't assume this knowledge and add links to related documents, but having it will make you more confident and let you work faster and more efficiently.

## What's next

Now that you understand what Vue Storefront is, go to the [Installation](./installation.html) guide to set up a project.
