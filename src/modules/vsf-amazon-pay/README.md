# Vue Storefront Amazon Pay Payment Extension

The Amazon Pay Payment module for [vue-storefront](https://github.com/DivanteLtd/vue-storefront).

## Installation

By hand (preferer):

```shell
git clone git@github.com:AbsoluteWebServices/vsf-amazon-pay.git ./vue-storefront/src/modules/
```

Registration the AmazonPay module. Go to `./vue-storefront/src/modules/index.ts`

```js
...
import { AmazonPay } from './vsf-amazon-pay';

export const registerModules: VueStorefrontModule[] = [
  ...
  AmazonPay
]
```

Add following settings to your config file.
Read more about Asynchronous Authorization at [developer.amazon.com](https://developer.amazon.com/docs/amazon-pay-onetime/request-an-authorization.html#asynchronous-vs-synchronous-authorization-api-calls)

```json
  "amazonPay": {
      "sandbox": true,
      "merchantId": "__MERCHANT_ID__",
      "clientId": "__CLIENT_ID__",
      "endpoint": {
        "GetOrderReferenceDetails": "http://localhost:8080/api/ext/amazon-pay/GetOrderReferenceDetails",
        "SetOrderReferenceDetails": "http://localhost:8080/api/ext/amazon-pay/SetOrderReferenceDetails",
        "ConfirmOrderReference": "http://localhost:8080/api/ext/amazon-pay/ConfirmOrderReference",
        "CancelOrderReference": "http://localhost:8080/api/ext/amazon-pay/CancelOrderReference",
        "Authorize": "http://localhost:8080/api/ext/amazon-pay/Authorize"
      },
      "storeName": "__STORE_NAME__",
      "authorization": {
        "asynchronous": true
      }
    },
```

## Amazon Pay Payment API extension

Install additional extension for `vue-storefront-api`:

```shell
cp -f ./vue-storefront/src/modules/vsf-amazon-pay/API/amazon-pay ./vue-storefront-api/src/api/extensions/
```

Add the config to your api config.

```json
  "extensions":{
    "amazonPay": {
      "sandbox": true,
      "accessKey": "__AMAZON_PAY_ACCESS_KEY__",
      "secretKey": "__AMAZON_PAY_ACCESS_SECRET__",
      "sellerId": "__MERCHANT_ID__",
      "endpoint": "https://mws.amazonservices.com"
    },
    ...
  }
```
