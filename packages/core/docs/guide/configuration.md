# Configuration

Usually, the first thing to do after setting up a fresh Vue Storefront project is configuring it. The bare minimum is to provide the API credentials for your integrations.

Your Vue Storefront-related configuration is located in two places:

- `nuxt.config.js` is a place where you're configuring properties related only to the frontend part of your application.
- `middleware.config.js` is a place where you're configuring your integration middleware. You will put there API keys, integration configurations, custom GraphQL queries and new API endpoints.

## Configuring Integrations

Most of the integrations business logic is placed in the [Integration Middleware](/v2/advanced/server-middleware). Therefore they're configurable through the `integrations` field in `middleware.config.js`. 

```js
// middleware.config.js
module.exports = {
  integrations: {
   // integration configs
  }
};
```

Sometimes integrations also expose a Nuxt module to configure frontend-related properties and [i18n](/v2/advanced/internationalization).

```js
// nuxt.config.js
[`@vue-storefront/{INTEGRATION}/nuxt` {
  i18n: {
    // i18n config
  }
}]
```

Below you can find links to the setup instructions and config references of the official eCommerce integrations:

<CommerceIntegrationLinks 
 commercetools="/commercetools/api-client.html"
 shopify="/shopify/api-client.html"
/>


## Configuring Nuxt

We try to use the most common modules from Nuxt Community whenever it's possible. For internationalization we are using `nuxt-i18n`, for PWA capabilities `@nuxtjs/pwa` etc. You can find a list of the Nuxt modules used in the default theme [here](theme.html#preinstalled-modules-and-libraries). Each of them is configured in a way that works best for the majority of users.

There are some features and behaviors that are specific to Vue Storefront only yet not specific to a certain integration. You can configure such things through `@vue-storefront/nuxt` module.

[//]: # 'TODO: Add documentation for VSF/NUXT module'

Below you can find its default configuration:

```js
// nuxt.config.js
[
  `@vue-storefront/nuxt`,
  {
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
        paths: ['**/*.vue'],
      },
    },
    // use `module` field from `package.json` for included packages
    // custom configuration will be merged with the default one
    // this property is used mainly to process ESM and benefit the most from treeshaking
    useRawSource: {
      dev: ['@storefront-ui/vue', '@storefront-ui/shared'],
      prod: ['@storefront-ui/vue', '@storefront-ui/shared'],
    },
  },
];
```
::: danger
It's unsafe and not recommended to remove `@vue-storefront/nuxt` from your project. Integrations and other modules rely on it.
:::

## Configuring Middleware

There are certain things related to Integration Middleware that are not tied to any specific integration like setting custom GraphQL queries you can configure. You can read more about the Middleware and its configuration [here](/v2/advanced/server-middleware).