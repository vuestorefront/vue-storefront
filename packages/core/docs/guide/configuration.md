# Configuration

Usually, the first thing to do after setting up a fresh Vue Storefront project is configuring it. The bare minimum is to provide the API credentials for your integrations but in most cases, you will also want to configure app behavior to match your business requirements.

All project configuration happens through Nuxt modules (and plugins they register) so you should start your journey with Vue Storefront in `nuxt.config.js`.

## Configuring Vue Storefront and global properties

So-called "general configuration" is common for all integrations and describes the overall behavior of your application. You will find there things like routes list, internationalization, performance enhancements or logging configuration.

We try to use the most common modules from Nuxt Community for these things so for internationalization we are using `nuxt-i18n`, for PWA capabilities `@nuxtjs/pwa` etc. You can find a list of the Nuxt modules used in the default theme [here](theme.html#preinstalled-modules-and-libraries). Each of them is configured in a way that works best for the majority of users.

There are some features and behaviors that are specific to Vue Storefront only yet not specific to a certain integration. You can configure such things through `@vue-storefront/nuxt` module. 

[//]: # (TODO: Add documentation for VSF/NUXT module)

Below you can find its default configuration:

::: danger
It's unsafe and not recommended to remove `@vue-storefront/nuxt` from your project as many integrations and other modules rely on it.
:::
```js
// nuxt.config.js
[`@vue-storefront/nuxt`, {
  // use only if you're developing an integration
  // adds theme inheritance mechanism
  coreDevelopment: false,
  logger: {
    // read about this part in `Advanced/Logging` section
  },
  performance: {
    httpPush: true,
    // installs https://purgecss.com/guides/nuxt.html
    // CAUTION: Could break classess generated dynamically (eg variable + '-secondary')
    purgeCSS: {
      enabled: false,
      paths: [
        '**/*.vue'
      ]
    }
  },
  // use `module` field from `package.json` for included packages
  // custom configuration will be merged with the default one
  useRawSource: {
    dev: ['@storefront-ui/vue', '@storefront-ui/shared'],
    prod: ['@storefront-ui/vue', '@storefront-ui/shared']
  }
}]
```


## Configuring integrations

Your app will be full of integrations and extensions. At least you'll have an eCommerce platform, CMS and some payment provider. Each of them is configurable through a dedicated Nuxt module. You can find a Nuxt module of every official Vue Storefront integration in it's `/nuxt` directory (`@vue-storefront/{integration}/nuxt`).

Below you can find links to configs of the official eCommerce integrations:

<CommerceIntegrationLinks 
 commercetools="/commercetools/api-client.html"
 shopify="/shopify/api-client.html"
/>


