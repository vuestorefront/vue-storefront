# PayPal payments support

Vue Storefront is supporting PayPal payments with PayPal Payment extension for [vue-storefront](https://github.com/DivanteLtd/vue-storefront), by [Develo Design](https://www.develodesign.co.uk).

## The architecture

![Architecture diagram](../images/paypal.svg)


## Installation:

By hand (preferred):
```shell
$ git clone git@github.com:develodesign/vsf-payment-paypal.git ./vue-storefront/src/modules/paypal
```

Or as dependency. Add the extension to your Vue Storefront `package.json` using:
```shell
$ npm install vsf-payment-paypal --save
```

Add the following as well to your `config/local.json` Set `paypal.env` to `sandbox` or `production`.
```json
"paypal": {
  "env": "sandbox",
  "endpoint": {
    "create": "http://localhost:8080/api/ext/payment-paypal/create",
    "execute": "http://localhost:8080/api/ext/payment-paypal/execute"
  }
}
```

Enable cart sync with the server (for corrected totals calculation by getters):

```json
"cart": {
  ...
  "synchronize": true,
  "synchronize_totals": true
}
```

Integrate the PayPal Button to Order Review component in the theme folder:

```shell
cp ./src/modules/paypal/components/core/blocks/Checkout/OrderReview.vue ./src/themes/default/components/core/blocks/Checkout/OrderReview.vue
```

Registration the Paypal module. Go to `./src/modules/index.ts`
```js
...
import { GoogleAnalytics } from './google-analytics';
import { Paypal } from './paypal';

export const registerModules: VueStorefrontModule[] = [
  ...
  GoogleAnalytics,
  Paypal
]
```


## PayPal payment API extension

Install the additional extension for `vue-storefront-api`:
```shell
$ mkdir -p ../vue-storefront-api/src/api/extensions/payment-paypal
$ cp -f ./api-ext/index.js ../vue-storefront-api/src/api/extensions/payment-paypal/
```

Go to api config  `./vue-storefront-api/config/local.json` and register the Paypal API extension:
```
"registeredExtensions": [
    ...
    "payment-paypal"
]
```

And add the `paypal` settings to `extensions` key:
```
  "extensions": {
    "mailchimp": {
      ...
    },
    "paypal": {
      "api": "https://api.sandbox.paypal.com",
      "client": "",
      "secret": ""
    }
  }
```

## Magento 2 integration

This API extension executes payment to the PayPal gateway. It uses `develodesign/m2-paypal-payment` [The custom Paypal payment method for Magento2](https://github.com/develodesign/m2-paypal-payment) composer module, so you have to install it in your Magento instance.

## Customization

Also, we can use the `paypal.style` option for a more customizable PayPal button view. For more info [PayPal](https://developer.paypal.com/demo/checkout/#/pattern/checkout).

```json
"paypal": {
  ...
  "style": {
    "size": "small",
    "color": "gold",
    "shape": "pill"
  }
}
```
