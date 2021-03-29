# Adyen <Badge text="Enterprise" type="info" />

::: warning Paid feature
This feature is part of the Enterprise version. Please [contact our team](https://www.vuestorefront.io/contact/sales) if you'd like to use it in your project.
:::

## Introduction

This package provides integration with [Adyen](https://www.adyen.com/). For more information about this topic, please refer to the [payment providers](../guide/checkout.html#payment-providers) page.

## Installation

1. Install required packages:

```sh
yarn add @vsf-enterprise/adyen
```

2. Add `@vsf-enterprise/adyen` to raw sources:
```js
// nuxt.config.js

export default {
  buildModules: [
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      useRawSource: {
        dev: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core',
          '@vsf-enterprise/adyen'
        ],
        prod: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core',
          '@vsf-enterprise/adyen'
        ]
      }
    }]
  ]
};
```

3. Register `@vsf-enterprise/adyen/nuxt` module with following configuration:

```js
// nuxt.config.js

export default {
  modules: [
    ['@vsf-enterprise/adyen/nuxt', {
      availablePaymentMethods: [
        'scheme',
        'paypal'
      ],
      clientKey: '<ADYEN_CLIENT_KEY>',
      environment: 'test',
      methods: {
        paypal: {
          merchantId: '<PAYPAL_MERCHANT_ID>',
          intent: 'capture'
        }
      }
    }]
  ]
};
```

* `availablePaymentMethods` - An array of available payment methods. Here you can find [available values](https://docs.adyen.com/payment-methods).
* `clientKey` - Your client's key. Here you can find information [how to find it](https://docs.adyen.com/development-resources/client-side-authentication#get-your-client-key).
* `environment` - `test` or `live`
* `methods.paypal`:
  * `intent`: `capture` to take cash immediately or `authorize` to delay it.
  * `merchantId`: 13-chars code that identifies your merchant account. Here you can find information [how to find it](https://www.paypal.com/us/smarthelp/article/FAQ3850).


4. Add `@vsf-enterprise/adyen/server` integration to the middleware with following configruation:
```js
// middleware.config.js

adyen: {
  location: '@vsf-enterprise/adyen/server',
  configuration: {
    ctApi: {
      apiHost: '<CT_HOST_URL>',
      authHost: '<CT_AUTH_URL>',
      projectKey: '<CT_PROJECT_KEY>',
      clientId: '<CT_CLIENT_ID>',
      clientSecret: '<CT_CLIENT_SECRET>',
      scopes: [
        'manage_project:<CT_PROJECT_KEY>'
      ]
    },
    adyenMerchantAccount: '<ADYEN_MERCHANT_ACCOUNT>',
    commercetoolsProjectKey: '<CT_PROJECT_KEY>',
    origin: 'http://localhost:3000',
    returnUrl: 'http://localhost:3000/api/adyen/cardAuthAfterRedirect',
    buildRedirectUrlAfter3ds1 (paymentAndOrder, succeed) {
      let redirectUrl = `/checkout/thank-you?order=${paymentAndOrder.order.id}`;
      if (!succeed) {
        redirectUrl += '&error=authorization-failed';
      }
      return redirectUrl;
    }
  }
}
```

* `configuration`:
  * `ctApi` - You need `manage_project` scope to make it work properly, rest information for this property you could find [there](../commercetools/getting-started.html#configuring-your-commercetools-integration).
  * `adyenMerchantAccount` - Name of your Adyen's merchant account
  * `commercetoolsProjectKey` - Same as `ctApi.projectKey`
  * `origin` - URL of your frontend. You could check it by printing out `window.location.origin`
  * `returnUrl` - URL where user will be redirected after 3DS1 Auth. Here we are making some payment finalization operations server side and calling `buildRedirectUrlAfter3ds1` which tells the server where the user should be redirect.
  * `buildRedirectUrlAfter3ds1` - `(paymentAndOrder: PaymentAndOrder, succeed: boolean) => string` - A method that tells the server where to redirect the user from `returnUrl`. You can test it with [these cards](https://docs.adyen.com/development-resources/test-cards/test-card-numbers#test-3d-secure-authentication)

```ts
type PaymentAndOrder = Payment & { order: Order }
```

HERE I WILL PUT A DIAGRAM, STAY TUNED


5. Add `origin` to allowed origins in Adyen's dashboard. You can do it in the same place where you looked for the `clientKey`.

6. Commercetools shares [Adyen integration](https://github.com/commercetools/commercetools-adyen-integration) which should be deployed as an independent app. We recommend to deploy it as a Google Function or a AWS Lambda.

::: warning
Make sure to deploy both [extension](https://github.com/commercetools/commercetools-adyen-integration/tree/master/extension) and [notification](https://github.com/commercetools/commercetools-adyen-integration/tree/master/notification) module.
:::

::: warning
You will also need to configure both modules. Check readme of [the repository](https://github.com/commercetools/commercetools-adyen-integration) for details.
:::

7. Use `PaymentAdyenProvider.vue` as a last step of the checkout process.
```vue
<PaymentAdyenProvider
  :afterPay="afterPayAndOrder"
/>
```

`afterPay` is called just after payment is authorized and order placed. Here you could make actions like redirect to the thank you page and clear a cart.
```js
const afterPayAndOrder = async (order) => {
  context.root.$router.push(`/checkout/thank-you?order=${order.id}`);
  setCart(null);
};
```

## Paypal configuration
Configuration of PayPal is well-described in Adyen's documentation, please use [it](https://docs.adyen.com/payment-methods/paypal/web-drop-in).
