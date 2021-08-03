# Configuration


Shopify configuration is located in two places:

- nuxt.config.js is a place where you're configuring properties related only to the frontend part of your application.

- middleware.config.js is a place where you're configuring the Shopify SDK and extensions. You will put there API keys, integration configurations, custom GraphQL queries and new API endpoints.

## Nuxt Shopify configuration

```js
// nuxt.config.js
['@vue-storefront/shopify/nuxt', {
  i18n: {
    useNuxtI18nConfig: true
  }
}]
```

- `useNuxtI18nConfig` - when enabled, `@vue-storefront/shopify/nuxt` package will use `i18n` config object provided in `nuxt.config.js`. Otherwise, the `i18n` config should be declared directly inside this package configuration. You can read more about it on [Internationalization](https://docs.vuestorefront.io/v2/advanced/internationalization.html) page

## Middleware shopify configuration

You can read more about middleware configuration in Vue Storefront [here](../advanced/server-middleware.md#configuration)

```js
// middleware.config.js
module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'YOUR SHOPIFY STORE DOMAIN',
          storefrontAccessToken: 'SHOPIFY STORE API KEY'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};

```

### `api`

- `domain` - link to your Shopify storefront.
- `storefrontAccessToken` - Shopify private app API key. Visit [Shopify documentation](https://shopify.dev/tutorials/generate-api-credentials) for more details about creating an API key

### `acceptLanguage`

An array of possible locales Shopify will use. You can read more about Shopify internationalization configuration [here](https://shopify.dev/tutorials/review-theme-store-requirements-internationalization)

```js
acceptLanguage: ['en-gb', 'en-us']
```

### `languageMap`

If you supply a `languageMap` during setup this will be used to map a locale to the accepted languages.

```js
languageMap: {
  'en-gb': ['en-gb', 'en-us'],
  'en-us': ['en-us', 'en-gb'],
}
```
