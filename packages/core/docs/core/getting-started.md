

 # Getting started

[[toc]]

----
To start working with Vue Storefront for {{ $frontmatter.platform }} you have to install two core packages that will  integrate your {{ $frontmatter.platform }} instance with Vue Storefront.

- [**{{ $frontmatter.platform }} API Client**](./api-client) - A data layer of your application that connects directly to {{ $frontmatter.platform }}. It provides a friendly abstraction layer over network calls with some additional overriding capabilities. It can be used as it is in any JavaScript application but doesn't provide much value by itself. API Client is usually used in the combination with Composition Functions package and is not used directly in the UI layer.
- [**{{ $frontmatter.platform }} Composition Functions**](./composables) - A set of **declarative** composition API functions allowing to interact with eCommerce logic in your Vue application that provides additional functionalities like Vue reactivity, SSR support, client-side request caching etc. This is the main integration package and it uses API Client under the hood.

## Installation
### With Vue Storefront CLI (recommended)
::: danger 
Work in progress
:::

::: tip Best for new projects
If you're starting a new Vue Storefront project and you're ok with using Nuxt using CLI its the best option for you.
:::

This is the easiest and fastest way of bootstrapping new Vue Storefront project. With Vue Storefront CLI you can generate preconfigured, working boilerplate shop in one minute! 

During the installation process you will be asked questions about:

- eCommerce platform you want to use
- CMS platform
- Whether you want or doesn't want to generate a working UI layer based on Storefront UI

Based on provided answers Vue Storefront CLI will generate a project already integrated with the services that you have chosen.

### Nuxt project installation

First, install the packages:

<Content slot-key="installation-nuxt" />

Once packages are installed you need to add Nuxt Composition API, VSF Nuxt Theme module, VSF Nuxt module, and integration Nuxt Module in `nuxt.config.js` to the `buildModules` section:

<Content slot-key="nuxt-setup-module" />

`nuxt-composition-api` - adds [nuxt-composition-api](https://composition-api.nuxtjs.org/)   
`@vue-storefront/nuxt-theme` - adds routes with default configuration   
`@vue-storefront/nuxt` - allows to use raw source for listed packages and adds dedicated plugins   
`@vue-storefront/<backend_name>/nuxt` - installs integration with eCommerce backend

### Non-Nuxt project installation

First, install the packages:

<Content slot-key="installation" />

Once packages are installed you need to invoke the `setup` method that will configure your {{ $frontmatter.platform }} integration before using any other method from the integration. You can read how to configure it [here](./api-client).

<Content slot-key="setup" />

In the next chapters, you will learn in-depth about {{ $frontmatter.platform }} API Client and Composition API functions.
