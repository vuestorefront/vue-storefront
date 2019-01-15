# PayPal payments support

Vue Storefront is supporting PayPal payments with PayPal Payment extension for [vue-storefront](https://github.com/DivanteLtd/vue-storefront), by [Develo Design](https://www.develodesign.co.uk).

## The architecture

![Architecture diagram](/vue-storefront/paypal.svg)

## Installation using NPM

Add the extension to your Vue Storefront `package.json` using:

```bash
$ npm install vsf-payment-paypal --save
```

Add `vsf-payment-paypal` to the `extensions/index.js`

```js
export default [
  require('@vue-storefront/extension-droppoint-shipping/index.js'),
  require('@vue-storefront/extension-google-analytics/index.js'),
  require('@vue-storefront/extension-mailchimp-subscribe/index.js'),
  require('@vue-storefront/extension-payment-backend-methods/index.js'),
  require('@vue-storefront/extension-payment-cash-on-delivery/index.js'),
  require('@vue-storefront/extension-template/index.js'),
  require('vsf-payment-stripe/index.js'),
  require('src/extensions/cms/index.js'),

  require('vsf-payment-paypal/index.js'),
];
```

Add the following also to your `config/local.json` need set `paypal.env` to `sandbox` or `production`.

```js
"paypal": {
  "env": "sandbox",
  "create_endpoint": "http://localhost:8080/api/ext/paypal-payment/create",
  "execute_endpoint": "http://localhost:8080/api/ext/paypal-payment/execute",
  "style": {
    "size": "small",
    "color": "gold",
    "shape": "pill"
  }
}
```

Also we can use `paypal.style` option for more customizable PayPal button view. For more info [PayPal](https://developer.paypal.com/demo/checkout/#/pattern/checkout).

## Vue Storefront API

After setting up the Vue Storefront extension - please setup the API with [https://github.com/develodesign/vsf-payment-paypal-api#readme](https://github.com/develodesign/vsf-payment-paypal-api#readme).

This API extension execute payment to PayPal gateway.
It use [`develodesign/m2-paypal-payment`](https://github.com/develodesign/m2-paypal-payment) composer module so you have to install it in your Magento instance.

in your `local.json` file you should register the extension:
`"registeredExtensions": ["mailchimp-subscribe", "example-magento-api", "paypal-payment"],`

And need add the `paypal` settings to `extensions` key in `local.json`:

```json
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

The API endpoitns are:

```
/api/ext/paypal-payment/create
/api/ext/paypal-payment/execute
```
