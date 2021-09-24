# Configuration


Commercetools configuration is located in two places:

- nuxt.config.js is a place where you're configuring properties related only to the frontend part of your application.

- middleware.config.js is a place where you're configuring the Commercetools SDK, Apollo and extensions. You will put there API keys, integration configurations, custom GraphQL queries and new API endpoints.

## Nuxt Commercetools configuration

```js
// nuxt.config.js
['@vue-storefront/commercetools/nuxt', {
  i18n: {
    useNuxtI18nConfig: true
  }
}]
```

- `useNuxtI18nConfig` - when this property is set to true, `@vue-storefront/commercetools/nuxt` package will use `i18n` config object provided in `nuxt.config.js`. When set to false, `i18n` config should be declared directly inside this package configuration. You can read more about `i18n` config in Vue Storefront [here](../advanced/internationalization.md)

## Middleware Commercetools configuration

You can read more about middleware configuration in Vue Storefront [here](../advanced/server-middleware.html#configuration)

```js
// middleware.config.js
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: 'https://<DOMAIN_NAME>.com/<PROJECT_KEY>/graphql',
          authHost: 'https://auth.sphere.io',
          projectKey: '<PROJECT_KEY>',
          clientId: '<CLIENT_ID>',
          clientSecret: '<CLIENT_SECRET>',
          scopes: [
            'manage_products:<PROJECT_KEY>',
            /* other scope rules */
          ]
        }
      }
    }
  }
};
```

### `api`

- `uri` - link to your Commercetools GraphQL API instance.
- `authHost` - link to Commercetools Authentication Server. It is used to request an access token from commercetools OAuth 2.0 service. To choose the nearest service, please visit [Commercetools hosts list](https://docs.commercetools.com/api/authorization)
- `projectKey` - name of your Commercetools project, i.e. `my-awesome-vsf-project`
- `clientId` - unique Commercetools Client ID. Visit [Commercetools documentation](https://docs.commercetools.com/tutorials/getting-started#creating-an-api-client) for more details about creating an API Client
- `clientSecret` - Commercetools secret API key. Visit [Commercetools documentation](https://docs.commercetools.com/tutorials/getting-started#creating-an-api-client) for more details about creating an API Client
- `scopes` - The scope constrains the endpoints to which a client has access, and whether a client has read or write access to an endpoint. Visit [Commercetools documentation](https://docs.commercetools.com/api/scopes#top) for more details about Scopes.

By default, the internationalization settings, such as `currency`, `locale`, and `country` are loaded from cookies. To override this behavior you can set those properties inside the `configuration` section.

```js
// middleware.config.js
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: { /* ... */},
        currency: 'EUR',
        locale: 'en',
        country: 'US'
      }
    }
  }
};
```


### `acceptLanguage`

An array of possible locales Commercetools will use. You can read more about Commercetools internationalization configuration [here](https://docs.commercetools.com/api/projects/orders-import#language-filtering)

```js
acceptLanguage: ['en-gb', 'en-us']
```

### `languageMap`

If you supply a `languageMap` during the setup, this will be used to map a locale to the accepted languages.

```js
languageMap: {
  'en-gb': ['en-gb', 'en-us'],
  'en-us': ['en-us', 'en-gb'],
}
```

### `inventoryMode`

If you want to change the way your commercetools inventory is being tracked, you can provide `inventoryMode` option in the middleware configuration. It can be set to one of the following values: `None`, `TrackOnly`, and `ReserveOnOrder`. When not specified, the Inventory Mode is set to `None` by default. You can read more about Inventory Modes in [commercetools documentation](https://docs.commercetools.com/api/projects/carts#inventorymode).

```js
inventoryMode: 'TrackOnly'
```
