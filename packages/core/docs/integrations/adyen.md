# Adyen <Badge text="Enterprise" type="info" />

>This feature is part of the Enterprise version. Please [contact our team](https://www.vuestorefront.io/contact/sales) if you'd like to use it in your project.

## Introduction

This package provides integration with [Adyen](https://www.adyen.com/). For more information about payment integrations, please refer to the [payment providers](../guide/checkout.html#payment-providers) page.

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

* `availablePaymentMethods` - An array of available payment methods. There are [available values](https://docs.adyen.com/payment-methods).
* `clientKey` - Your client's key. There is information [how to find it](https://docs.adyen.com/development-resources/client-side-authentication#get-your-client-key).
* `environment` - `test` or `live`
* `methods.paypal`:
  * `intent`: `capture` to take cash immediately or `authorize` to delay a charging.
  * `merchantId`: 13-chars code that identifies your merchant account. There is information [how to find it](https://www.paypal.com/us/smarthelp/article/FAQ3850).


4. Add `@vsf-enterprise/adyen/server` integration to the middleware with the following configuration:
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
        'manage_orders:<CT_PROJECT_KEY>',
        'manage_payments:<CT_PROJECT_KEY>'
      ]
    },
    adyenMerchantAccount: '<ADYEN_MERCHANT_ACCOUNT>',
    origin: 'http://localhost:3000',
    buildRedirectUrlAfter3ds1Auth (paymentAndOrder, succeed) {
      let redirectUrl = `/checkout/thank-you?order=${paymentAndOrder.order.id}`;
      if (!succeed) {
        redirectUrl += '&error=authorization-failed';
      }
      return redirectUrl;
    },
    buildRedirectUrlAfter3ds1Error (err) {
      return '/?3ds1-server-error';
    }
  }
}
```

* `configuration`:
  * `ctApi` - You need `manage_orders` and `manage_payments` scopes to make it work properly, base on [that page](../commercetools/getting-started.html#configuring-your-commercetools-integration) during configuring this property.
  * `adyenMerchantAccount` - Name of your Adyen's merchant account
  * `origin` - URL of your frontend. You could check it by printing out `window.location.origin` in the browser's console on your website.
  * `buildRedirectUrlAfter3ds1Auth` - `(paymentAndOrder: PaymentAndOrder, succeed: boolean) => string` - A method that tells the server where to redirect the user after 3DS1 Auth. You can test it with [these cards](https://docs.adyen.com/development-resources/test-cards/test-card-numbers#test-3d-secure-authentication).
  * `buildRedirectUrlAfter3ds1Error` - `(err: Error) => string` - A method that tells the server where to redirect the user if error has been thrown inside `cardAuthAfterRedirect` controller.

```ts
type PaymentAndOrder = Payment & { order: Order }
```

5. Add an `origin` to the allowed origins in Adyen's dashboard. You can do it in the same place where you looked for the `clientKey`.

6. Commercetools shares [Adyen integration](https://github.com/commercetools/commercetools-adyen-integration). We recommend to deploy it as a Google Function or an AWS Lambda. Make sure to configure and deploy both [extension](https://github.com/commercetools/commercetools-adyen-integration/tree/master/extension) and [notification](https://github.com/commercetools/commercetools-adyen-integration/tree/master/notification) module. Check readme of [the repository](https://github.com/commercetools/commercetools-adyen-integration) for details.

:::warning Bigger permissions for extensions
As you can see in `commercetools-adyen-integration` repository, commercetools recommends to use `manage_project` scope for both notification and extension module.
:::

7. Use `PaymentAdyenProvider.vue` as a last step of the checkout process. This component will mount Adyen's Web Drop In and handle payment process for you.
```vue
<PaymentAdyenProvider
  :afterPay="afterPayAndOrder"
/>
```

`afterPay` is called just after payment is authorized and order placed. There you can make actions like redirecting to the thank you page and clearing a cart.
```js
const afterPayAndOrder = async ({ order }) => {
  context.root.$router.push(`/checkout/thank-you?order=${order.id}`);
  setCart(null);
};
```

### Paypal configuration
Configuration of PayPal is well-described in [Adyen's documentation](https://docs.adyen.com/payment-methods/paypal/web-drop-in).

## API
`@vsf-enterprise/adyen` exports a *useAdyen* composable.   
`@vsf-enterprise/adyen/src/PaymentAdyenProvider` exports a [VSF Payment Provider](../commercetools/getting-started.html#configuring-your-commercetools-integration) component as a default.

## Composable
`useAdyen` composable returns a few properties and methods.

#### Properties
* `error` - Computed<_AdyenError_> - errors' state of asynchronous methods.
* `loading` - Computed<_Boolean_> informing if composable is performing some asynchronous method right now.
* `paymentObject` - Computed<_any_> containing payment object in the commercetools. It is updated by `createContext`, `payAndOrder`, `submitAdditionalPaymentDetails` methods.

```ts
interface AdyenError {
  submitAdditionalPaymentDetails: Error | null,
  createContext: Error | null,
  payAndOrder: Error | null
}
```

#### Methods
* `createContext` - Loads a cart, then fetching available payment methods for the loaded cart. At the end, a method stores a response inside `paymentObject`.
* `buildDropinConfiguration` - `(config: AdyenConfigBuilder): any` - Builds a configuration object for Adyen's Web Drop-In.
* `payAndOrder` - Setting value of the custom field called `makePaymentRequest` in the commercetools' payment object. Commercetools will send it to the Adyen and give you the response. As a last step, a method is storing a response inside the `paymentObject`.
* `submitAdditionalPaymentDetails` - Setting value of the custom field `submitAdditionalPaymentDetailsRequest` in the commercetools' payment. Commercetools will send it to the Adyen and give you the response. As a last step, a method is storing a response inside the `paymentObject`.

```ts
interface AdyenConfigBuilder {
  paymentMethodsResponse,
  onChange = (state, component) => {},
  onSubmit = (state, component) => {},
  onAdditionalDetails = (state, component) => {},
  onError = (state) => {}
}
```

## Components
`PaymentAdyenProvider` component fetches available payment methods and mounts Adyen's Web Drop-In. It takes care of the whole flow of the payment. It allows you to hook into some events by passing functions via props.
* `beforeLoad` - `config => config` - Called just before creating an instance of the `AdyenCheckout` and mounting a Drop-In.
* `beforePay` - `stateData => stateData` - Called just before calling a `payAndOrder`. Here we can modify the payload.
* `afterPay` - `paymentAndObject: PaymentAndOrder => void` - Called after we got result code equal `Authorized` from the Adyen, and an order has been placed.
* `afterSelectedDetailsChange` - Called inside `onChange` of Adyen's Drop-In.
* `onError` - `(data: { action: string, error: Error | string }) => void` - Called after we got an error from either Adyen or our API.

## Placing an order
If the transaction is authorized, the server's controller for `payAndOrder`/`submitAdditionalPaymentDetails` will place an order in Commercetools and apply the `order` object to the response. Thanks to that, we have only one request from the client to both finalize/authorize a payment and make an order.

## Checkout.com
Adyen's module isn't compatible with [Checkout.com's module](https://github.com/vuestorefront/checkout-com).