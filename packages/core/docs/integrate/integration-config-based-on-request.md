# Integration's config based on request

## Introduction

In the previous document, you've read about extending an integration. Here I will show you a practical case of extending [Adyen commercetools](https://docs.vuestorefront.io/adyen/guide/introduction.html) integration to use a different `adyenMerchantAccount` and `clientKey` based on store cookie's value.

## Creating an extension

Creating `extensions` directory in your project and inside create `adyen.js`:

```js
const { VSF_STORE_COOKIE } = require('@vue-storefront/core');

const config = {
  default: {
    adyenMerchantAccount: 'default-merchant-account'
  },
  en: {
    adyenMerchantAccount: 'en-merchant-account'
  },
  de: {
    adyenMerchantAccount: 'de-merchant-account'
  },
  es: {
    adyenMerchantAccount: 'es-merchant-account'
  }
}

function getConfiguration(request, staticConfig) {
  const cookieName = request.cookies?.storeCookieName || VSF_STORE_COOKIE;
  const store = request.cookies?.[cookieName] || 'some-default-store';
  const newConfig = {
    ...staticConfig,
    ...(store && config[store] || config.default)
  };
  return newConfig;
}

module.exports = {
  name: 'adyenDynamicConfigExtension',
  hooks(request) {
    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        ...getConfiguration(request, configuration),
      })
    };
  },
};

```

## Registering an extension

To register an extension, add it to the array returned from the `extensions` function of a given integration in the `middleware.config.js` file:

```js
const adyenDynamicConfigExtension = require('./extensions/adyen');

module.exports = {
  integrations: {
    adyen: {
      location: '@vsf-enterprise/adyen-commercetools/server',
      configuration: {
        ctApi:{
          apiHost: 'https://api.europe-west1.gcp.commercetools.com',
          authHost: 'https://auth.europe-west1.gcp.commercetools.com',
          projectKey: 'vsf-******-demo',
          clientId: '***',
          clientSecret: '***',
          scopes:[
            'manage_project:vsf--******--demo'
          ]
        },
        adyenMerchantAccount: "some-account",
        origin: 'http://localhost:3000,
        buildRedirectUrlAfter3ds1Auth: (paymentAndOrder) => `/checkout/thank-you?order=${paymentAndOrder.order.id}`,
        buildRedirectUrlAfter3ds1Error: (err) => '/?3ds1-server-error'
      },
      // HERE
      extensions: extensions => [...extensions, adyenDynamicConfigExtension]
    }
  }
};
```
