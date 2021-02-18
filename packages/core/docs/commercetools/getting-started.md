# Getting started


## Configuring your Commercetools integration

If you [generated your project from our CLI](/general/getting-started.html) your shop will be connected to our demo Commercetools instance.

If you havn't generated your project just to play with Vue Storefront and understand its capabilities the first thing you should do after setting it up is changing the credentials to point into your instance.

You can generate credentials for Commercetools API in Commercetools Merchant Center by going into:

_Settings > API clients > "Create new api Client" and picking "Mobile & single-page application client"_

Then paste those credentials into `@vue-storefront/commercetools/nuxt` module configuration in `nuxt.config.js`:

```js
['@vue-storefront/commercetools/nuxt', {
  api: {
    uri: 'https://yourshop.com/vsf-ct-dev/graphql',
    authHost: 'https://auth.sphere.io',
    projectKey: 'vsf-ct-dev',
    clientId: '<your_client_id>',
    clientSecret: '<your_client_secret>',
    scopes: [
      //* scopes */
    ]
  }
}]
```

There is plenty fo other configuration options and you can check them [here](./configuration.md)

## Configuring other integrations

Depending on the configuration and if you're using Enterprise ersion you could hae additional integrations to set up. You will find their configurations in `nuxt.config.js`

