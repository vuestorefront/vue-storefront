# Getting started


## Configuring your Commercetools integration

If you [generated your project from our CLI](/general/getting-started.html) your shop will be connected to our demo Commercetools instance.

If you haven't generated your project just to play with Vue Storefront and understand its capabilities the first thing you should do after setting it up is changing the credentials to point into your instance.

You can generate credentials for Commercetools API in Commercetools Merchant Center by going into:

_Settings > API clients > "Create new api Client"_ and picking _"Mobile & single-page application client"_ template.

Then paste these credentials into `ct` config object inside `integrations` in `middleware.config.js`:

```js
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: 'https://<SHOP_DOMAIN>.com/vsf-ct-dev/graphql',
          authHost: 'https://auth.sphere.io',
          projectKey: 'vsf-ct-dev',
          clientId: '<CLIENT_ID>',
          clientSecret: '<CLIENT_SECRET>',
          scopes: [
            //* scopes */
          ]
        },
        currency: 'USD',
        country: 'US'
      }
    }
```

There is plenty for other configuration options and you can check them [here](./configuration.md)

## Configuring other integrations

Depending on the configuration and if you're using Enterprise version you could have additional integrations to set up. You will find their configurations in `middleware.config.js`
