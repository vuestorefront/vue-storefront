# Payment Gateway Integration

Vue Storefront is a platform-agnostic app. This means it can be connected to virtually any eCommerce backend. At the same time, most of the existing eCommerce platforms integrate the Payment Gateways (PG) using some kind of frontend hooks:

- Some gateways are integrated by iframe component
- Others are injected by JavaScript snippet etc.

In this situation, it's a rare case when you can modify your payment gateway with PWA—without creating the integration code by yourself.

## Community resources

Our community members created some really cool docs and reference implementation of payment modules You could and probably should base yours on:

- Blog post: [How to create VS 1.6 payment module](https://www.develodesign.co.uk/news/development-of-the-paypal-module-for-vue-storefront/)
- Paypal integration: [Paypal integration by Develodesign](https://github.com/develodesign/vsf-payment-paypal)
- Braintree integration: [Braintree integration by Daniel Coull](https://github.com/danrcoull/vsf-payment-braintree)

## Frontend integration

First step is to create a [Vue Storefront Module](../modules/introduction.md) to integrate the payment provider in the frontend. Any of the payment handling logic UI is handled solely via the Module. For the most basic version of how a Payment Module is, the "src/modules/payment-cash-on-delivery".

- The Payment Module, where applicable, should catch the `checkout-payment-method-changed`vent. If the payment method code is the desired one, then you have the option to dynamically inject any components into the order review section on the checkout—for example, credit card input fields, payment method information, etc.

- You are required to catch the `checkout-before-placeOrder` event and do any processing required for the payment method before placing the order.
- You are required to emit the `checkout-do-placeOrder` event with an optional payload to complete the placeorder process.
- For your payment method to display, add it to the Payment Methods collection in storage `app.\$store.state.payment.methods.push(paymentMethodConfig)`.
- Unregister any events when they are no longer required.
- For clarity in growing extensions, payment extensions should be named clearly  `payment-{VENDOR}-{PAYMENT_METHOD}`

### Cash on delivery example

Here is an example of a "Cash on delivery" payment method main logic. It's placed in the `src/modules/payment-cash-on-deliver/hooks/afterRegistration.ts` which is usually a good entry point for registering custom event hooks:

```js
import InfoComponent from '../components/Info.vue'
import config from 'config'

export function afterRegistration({ Vue, config, store, isServer }) {
  // Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
  const placeOrder = function () {
    EventBus.$emit('checkout-do-placeOrder', {})
  }

  if (!isServer) {
    // Update the methods
    let paymentMethodConfig = {
      'title': 'Cash on delivery',
      'code': 'cashondelivery',
      'cost': 0,
      'cost_incl_tax': 0,
      'default': true,
      'offline': true
    }
    rootStore.dispatch('payment/addMethod', paymentMethodConfig)

    // Mount the info component when required.
    EventBus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      if (paymentMethodCode === 'cashondelivery') {
        // Register the handler for what happens when they click the place order button.
        EventBus.$on('checkout-before-placeOrder', placeOrder)

        // Dynamically inject a component into the order review section (optional)
        const Component = Vue.extend(InfoComponent)
        const componentInstance = (new Component())
        componentInstance.$mount('#checkout-order-review-additional')
      } else {
        // unregister the extensions placeorder handler
        EventBus.$off('checkout-before-placeOrder', placeOrder)
      }
    })
  }
}

```

### More examples

You can find much more sophisticated solutions for [Paypal](https://github.com/develodesign/vsf-payment-paypal) on our partner - **Develodesign** github and [Braintree](https://github.com/danrcoull/vsf-payment-braintree)

More info:
- [How to create VS 1.6 Payment module](https://www.develodesign.co.uk/news/development-of-the-paypal-module-for-vue-storefront/)


## Backend Integration

After successfully integrating the payments on the frontend, you're sending the users and transactions to the payment integrator. Then, we need to get back the payment token/identifier and update the order status as soon as the payment integrator will let us know that the transaction finished.

To store the transaction info you'll get from the payment service, you may emit an event:

```js
    placeOrderWithPayload (payload) {
      this.$bus.$emit('checkout-do-placeOrder', payload)
```

where the payload equals to JSON object with additional order information. This object will be transferred to the server along with the order object in the  `order.payment_method_additional` property.

### The order workflow - server side

To get it right, first we must understand how Vue Storefront processes orders. Vue Storefront sends orders to the server asynchronously because of the offline orders support (orders can be sent immediately after they’replaced, minutes after or even hours).

The order is being sent to the `vue-storefront-api/api/order/create` endpoint. This API endpoint pushes the order to the queue from where it's being transferred to the eCommerce backend by a cron-run process called `order_2_magento2.js` (o2m). You will find the source code of `o2m` in the `vue-storefront-api/worker` folder.

As you can see, we don't have the backend's order number immediately after the order has been placed. To pair the client-side order ID and server-side metadata, `order_2_magento.js` process stores special metadata entries in `Redis` cache:

```js
api.cart.order(null, cartId, {
  "paymentMethod":
  {
      "method":orderData.addressInformation.payment_method_code,
      "additional_data":orderData.addressInformation.payment_method_additional
  }
}, isThisAuthOrder).then(result => {
  logger.info(THREAD_ID, result)()
  if(job) job.progress(currentStep++, TOTAL_STEPS);

  logger.info(THREAD_ID + '[OK] Order placed with ORDER ID', result);()
  logger.debug(THREAD_ID + result)()
  redisClient.set("order$$id$$" + orderData.order_id, JSON.stringify(
  {
      platform_order_id: result,
      transmited: true,
      transmited_at: new Date(),
      platform: 'magento2',
      order: orderData
  }));
  redisClient.set("order$$totals$$" + orderData.order_id, JSON.stringify(result[1]));

  if(job) job.progress(currentStep++, TOTAL_STEPS);
  return done(null, { magentoOrderId: result, transferedAt: new Date() });
```

As you can see, you can get the order data using the **client-side** order ID by accessing the `order$$id$${clientsideorderid}` in the local Redis instance.

You can check `vue-storefront-api/src/api/sync.js` with the `check` method:

```js
export default ({ config, db }) => {
  let syncApi = Router();

  /**
   * GET get stock item
   */
  syncApi.get('/order/:order_id', (req, res) => {
    const Redis = require('redis');
    let redisClient = Redis.createClient(config.redis); // redis client
    redisClient.on('error', function(err) {
      // workaround for https://github.com/NodeRedis/node_redis/issues/713
      redisClient = Redis.createClient(config.redis); // redis client
    });

    redisClient.get('order$$id$$' + req.param('order_id'), function(
      err,
      reply,
    ) {
      const orderMetaData = JSON.parse(reply);
      if (orderMetaData) {
        orderMetaData.order = null; // for security reasons we're just clearing out the real order data as it's set by `order_2_magento2.js`
      }
      apiStatus(res, err ? err : orderMetaData, err ? 500 : 200);
    });
  });

  return syncApi;
};
```

As this method returns the order data by non-secured URL with just the client-side order ID, there is an `order` property being removed to return just the platform ID of their order.

### Status change for the order

The example shown above was a prep step for updating the Magento (or other platform) order status based on the response from the payments integrator.

First, you need to add the special endpoint under the public URL that will be getting the notifications / statuses from the payments provider. Here is an example [how to add custom API endpoint to the `vue-storefront-api`](Extending vue-storefront-api.md).

To add the API extension to `vue-storefront-api`:

1. Create the folder within `src/api/extensions`. For example 'custom-payment-method`
2. Then add the `index.js` file and put the API methods code inside. We're using Express.js. Here is a boilerplate/example for the extension code:

```js
import { apiStatus } from '../../../lib/util';
import { Router } from 'express';

module.exports = ({ config, db }) => {
  let mcApi = Router();

  /**
   * POST create an user
   */
  mcApi.post('/status', (req, res) => {
    const notificationData = req.body;
    const order_id = ''; // we should extract the client's order id from the notification status
    /// ... business logic related to the status verification

    // getting the data from Redis - the original order
    const Redis = require('redis');
    const Magento2Client = require('magento2-rest-client').Magento2Client;

    let redisClient = Redis.createClient(config.redis); // redis client
    redisClient.on('error', function(err) {
      // workaround for https://github.com/NodeRedis/node_redis/issues/713
      redisClient = Redis.createClient(config.redis); // redis client
    });

    redisClient.get('order$$id$$' + order_id, function(err, reply) {
      const orderMetaData = JSON.parse(reply);
      if (orderMetaData) {
        // now we can use the api client to update the order status in Magento
        const client = Magento2Client(config.magento2.api);
        client.addMethods('invoice', function(restClient) {
          var module = {};

          module.create = function() {
            return restClient.post('/invoice/create'); // the real Magento2 endpoint should be here - this is just an example
          };
          return module;
        });
        client.invoice
          .create()
          .then(result => {
            apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
          })
          .catch(err => {
            apiStatus(res, err, 500);
          });
      }
    });
  });
  return mcApi;
};
```

3. Add the extension to `config/local.json`:

```json
	"registeredExtensions": ["custom-payment-method"],
```

4. Restart the `vue-storefront-api`
5. Your new API method is available on `localhost:8080/api/ext/<extension_name>/<extension_method>` for example: `localhost:8080/api/ext/custom-payment-method/status`

In this extension above, you may want to get the order data by the client-side order ID (passed to the payment service and probably returned with the notification). Then **you may use the Magento 2 API to update the payment status**, likely by executing the  `invoice` method.
