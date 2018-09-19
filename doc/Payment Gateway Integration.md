# Payment Gateway Integration

Vue Storefront is platforma agnostic app. That means it can be connected to virtually any eCommerce backend. By the same time, most of the existing eCommerce platforms integrates the Payment Gateways (PG) using some kind of frontend hooks:
 - some gateways are integrated by iframe component,
 - others are injected by JavaScript snippet etc.

 In this situation it's a rare case when You can modify Your payment gateway with PWA - without creating the integration code by Yourself.


 ## Frontend integration

 First step is to create a [Vue Storefront Extension](extensions/Working with extensions.md) to integrate the payment extension in the frontend. Any of the payment handling logic, UI is handled soley via the Extension. For the most basic version of how a Payment Extension is the "src/extensions/cash-on-delivery".

* The Payment Extension where applicable should catch the 'checkout-payment-method-changed' event, if the payment method code is the desired one, then you have the option to dynamically inject any components into the order review section on the checkout, (for example credit card input fields, payment method information etc).
* You are required to catch the 'checkout-before-placeOrder' event and do any processing required for the payment method before placing the order.
* You are required to emit the 'checkout-do-placeOrder' event with an optional payload to complete the placeorder process.
* For your payment method to display, add it to the Payment Methods collection in storage. 'app.$store.state.payment.methods.push(paymentMethodConfig)'
* Unregister any events when they are no longer required.
* For clarity in growing extensions, payment extensions should be named clearly 'payment-{VENDOR}-{PAYMENT_METHOD}'

### Cash on delivery example

Here is an example of "Cash on delivery" payment method:

```js
import Vue from 'vue'
import EventBus from '@vue-storefront/core/plugins/event-bus'

import extensionStore from './store'
import extensionRoutes from './router'
import InfoComponent from './components/info'

const EXTENSION_KEY = 'payment-cash-on-delivery'

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store

  app.$on('application-after-init', () => {
    console.debug(EXTENSION_KEY + ' extension initialised')
  })

  // Add this payment method to the config.
  let paymentMethodConfig = {
    'title': 'Cash on delivery',
    'code': 'cashondelivery',
    'cost': 0,
    'costInclTax': 0,
    'default': true,
    'offline': true
  }

  app.$store.dispatch('payment/addMethod', paymentMethodConfig)

  // Mount the info component when required.
  EventBus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
    if (paymentMethodCode === 'cashondelivery') {
      // Register the handler for what happens when they click the place order button.
      EventBus.$on('checkout-before-placeOrder', placeOrder)

      // Dynamically inject a component into the order review section (optional)
      const Component = Vue.extend(InfoComponent)
      const componentInstance = (new Component())

      // here it is the special slot for adding payment gateway information to the Order Review page
      componentInstance.$mount('#checkout-order-review-additional')
    } else {
      // unregister the extensions placeorder handler
      EventBus.$off('checkout-before-placeOrder', placeOrder)
    }
  })

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}

// Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
function placeOrder () {
  EventBus.$emit('checkout-do-placeOrder', {})
}
```

### More examples

You can find much more sophisticated solutions for [Paypal](https://github.com/develodesign/vsf-payment-paypal) and [Stripe](https://github.com/develodesign/vsf-payment-stripe) on our partner - **Develodesign** github

Looking at the Stripe integration You may seen that the main extension code looks more or less the same as Cash on Delivery - simply injecting additional information (custom component) to the Order Review page:

```js
import extensionStore from './lib/store'
import extensionRoutes from './lib/router'
import StripeComponent from './lib/components/PaymentStripe'
import EventBus from 'core/plugins/event-bus'
import Vue from 'vue'

const EXTENSION_KEY = 'vsf-payment-stripe'

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store

  app.$on('application-after-init', () => {
    console.log(EXTENSION_KEY + ' extension initialised')
  })

  // Add this payment method to the config.
  let paymentMethodConfig = {
    'name': 'Stripe',
    'code': 'stripe',
    'cost': 0,
    'costInclTax': 0,
    'default': false,
    'offline': false
  }

  app.$store.state.payment.methods.push(paymentMethodConfig)

  // Mount the stripe component when required.
  EventBus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
    if (paymentMethodCode === 'stripe') {
      const Component = Vue.extend(StripeComponent)
      const componentInstance = (new Component())
      componentInstance.$mount('#checkout-order-review-additional')
    }
  })

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}
```

The core of this integration, however, may be found in the `lib/components/PaymentStripe.vue` where the Stripe specific scripts are imported and included:


```js
<template>

  <div class="mb15 mt20 vsf-stripe-container">
    <h4 class="mt0">
      <label for="vsf-stripe-card-element">
        Credit or debit card
      </label>
    </h4>
    <div class="bg-cl-secondary px20 py20">
      <form action="" id="payment-form">
        <div class="form-row">

          <div id="vsf-stripe-card-element">
            &nbsp;
            <!-- A Stripe Element will be inserted here. -->
          </div>

          <!-- Used to display Element errors. -->
          <div id="vsf-stripe-card-errors" role="alert">
            &nbsp;
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>
  /* Base styling for the component. */

  .vsf-stripe-container label {
    font-weight: 500;
    font-size: 14px;
    display: block;
    margin-bottom: 8px;
    color: #818992;
  }
  #vsf-stripe-card-errors {
    margin: 8px auto 0;
    color: #fa755a;
  }
  .vsf-stripe-container .StripeElement {
    background-color: white;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }
  .vsf-stripe-container .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }
  .vsf-stripe-container .StripeElement--invalid {
    border-color: #fa755a;
  }
  .vsf-stripe-container .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
</style>

<script>
import i18n from 'core/lib/i18n'

export default {
  name: 'PaymentStripe',
  data () {
    return {
      dd_stripe: {
        instance: null,
        elements: null,
        card: null
      }
    }
  },
  mounted () {
    // Load the stripe.js elements script.
    // As it's callback, Configure stripe to run.
    this.loadStripeDependencies(this.configureStripe)

    // Ready to place order, handle anything we need to, generating, validating stripe requests & tokens ect.
    this.$bus.$on('checkout-before-placeOrder', this.onBeforePlaceOrder)

    // Ready to place order, handle anything we need to, generating, validating stripe requests & tokens ect.
    this.$bus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      if (paymentMethodCode !== 'stripe') {
        // unregister the extension placeorder handler
        this.$bus.$off('checkout-before-placeOrder', this.onBeforePlaceOrder)
      }
    })
  },
  methods: {
    onBeforePlaceOrder () {
      this.processStripeForm()
    },
    loadStripeDependencies (callback) {
      let stripeJsUrl = 'https://js.stripe.com/v3/'

      let docHead = document.getElementsByTagName('head')[0]
      let docScript = document.createElement('script')

      docScript.type = 'text/javascript'
      docScript.src = stripeJsUrl

      // When script is ready fire our callback.
      docScript.onreadystatechange = callback
      docScript.onload = callback

      docHead.appendChild(docScript)
    },
    configureStripe () {
      // Create a new Stripe client.

      if (typeof this.$config.stripe.api_key === 'undefined') {
        return false
      }

      this.dd_stripe.instance = window.Stripe(this.$config.stripe.api_key)

      // Create an instance of Elements.
      this.dd_stripe.elements = this.dd_stripe.instance.elements()

      // Create the stripe elements card
      this.createElements()

      // Add the event listeners for stripe.
      this.bindEventListeners()
    },
    createElements () {
      let style = {}

      if (typeof this.$config.stripe.style !== 'undefined') {
        style = this.$config.stripe.style
      }

      // Create an instance of the card Element.
      this.dd_stripe.card = this.dd_stripe.elements.create('card', { style: style })

      // Add an instance of the card Element into the `card-element` <div>.
      this.dd_stripe.card.mount('#vsf-stripe-card-element')
    },
    bindEventListeners () {
      // Handle real-time validation errors from the card Element.
      this.dd_stripe.card.addEventListener('change', this.onStripeCardChange)
    },
    onStripeCardChange (event) {
      let displayError = document.getElementById('vsf-stripe-card-errors')

      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    },
    beforeDestroy () {
      this.unbindEventListeners()
    },
    unbindEventListeners () {
      this.dd_stripe.card.removeEventListener('change', this.onStripeCardChange)
    },
    processStripeForm () {
      let ctx = this

      // Display loader
      this.$bus.$emit('notification-progress-start', i18n.t('Placing Order') + '...')

      // Generate token from stripe
      this.dd_stripe.instance.createToken(this.dd_stripe.card).then(function (result) {
        if (result.error) {
          // Inform the user if there was an error.
          let errorElement = document.getElementById('vsf-stripe-card-errors')

          errorElement.textContent = result.error.message
        } else {
          ctx.placeOrderWithPayload(result.token)
        }
        ctx.$bus.$emit('notification-progress-stop')
      })
    },
    placeOrderWithPayload (payload) {
      this.$bus.$emit('checkout-do-placeOrder', payload)
    }
  },
  components: {}
}
</script>
```

## Backend Integration

After succesfully integrating the payments on the frontend You're sending the users and transactions to the payment integrator. Then we need to get back the payment token/identifier and update the order status as soon as the payment integrator will let us know that the transaction finished.

To store the transaction info You'll get from the payment service You may emit an event:

```js
    placeOrderWithPayload (payload) {
      this.$bus.$emit('checkout-do-placeOrder', payload)
```

Where the payload equals to JSON object with additional order information.
This object will be transfered to the server along with the order object in the `order.payment_method_additional` property.

### The order workflow - server side

To get it right, first we must understand how Vue Storefront processes orders.
Vue Storefront sends orders to the server asynchronously because of the offline orders support (order can be send immediately after placed, minutes after or even hours).

The order is being send to `vue-storefront-api/api/order/create` endpoint. This API endpoint pushes the order to the queue from where it's being transfered to the eCommerce backend by cron-run process called `order_2_magento2.js` (o2m). You may find the source code of `o2m` in the `vue-storefront-api/worker` folder.

As You see we don't have the backend's order number immediately after order has been placed. To pair the client side order id and server side meta data `order_2_magento.js` process stores special metadata entries in `Redis` cache:

```js
                            api.cart.order(null, cartId, {
                                "paymentMethod":
                                {
                                    "method":orderData.addressInformation.payment_method_code,
                                    "additional_data":orderData.addressInformation.payment_method_additional
                                }
                            }, isThisAuthOrder).then(result => {
                                logger.info(THREAD_ID, result)
                                if(job) job.progress(currentStep++, TOTAL_STEPS);

                                logger.info(THREAD_ID + '[OK] Order placed with ORDER ID', result);
                                logger.debug(THREAD_ID + result)
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

As You may see - You can get the order data using **client side** order id by accesing the `order$$id$${clientsideorderid}` in local Redis instance.

You may check `vue-storefront-api/src/api/sync.js` the `check` method:

```js
export default ({ config, db }) => {

	let syncApi = Router();

	/** 
	 * GET get stock item
	 */
	syncApi.get('/order/:order_id', (req, res) => {

		const Redis = require('redis');
		let redisClient = Redis.createClient(config.redis); // redis client
		redisClient.on('error', function (err) { // workaround for https://github.com/NodeRedis/node_redis/issues/713
			redisClient = Redis.createClient(config.redis); // redis client
		});
		
		redisClient.get('order$$id$$' + req.param('order_id'), function (err, reply) {
			const orderMetaData = JSON.parse(reply)
			if (orderMetaData) {
				orderMetaData.order = null // for security reasons we're just clearing out the real order data as it's set by `order_2_magento2.js`
			}
			apiStatus(res, err ? err : orderMetaData,  err ? 500 :200);
		})
	})

	return syncApi
}
```

As this method returns the order data by non-secured URL with just client side order id - there is `order` property being removed to return just the platform id of ther order.

### Status change for the order

The example shown above was a prep. step for updating the Magento (or other platform) order status based on the response from the payments integrator.

First of all - You need to add the special endpoint under public URL which will be getting the notifications / statuses from the payments provider. Here is an example [how to add custom API endpoint to the `vue-storefront-api`](Extending vue-storefront-api.md).

To add the API extension to `vue-storefront-api`:

1. Create the folder within `src/api/extensions` for example 'custom-payment-method`
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

        const notificationData = req.body
        const order_id = '' // we should extract the client's order id from the notification status
        /// ... business logic related to the status verification

        // getting the data from Redis - the original order
        const Redis = require('redis');
        const Magento2Client = require('magento2-rest-client').Magento2Client
        
		let redisClient = Redis.createClient(config.redis); // redis client
		redisClient.on('error', function (err) { // workaround for https://github.com/NodeRedis/node_redis/issues/713
			redisClient = Redis.createClient(config.redis); // redis client
		});
		
		redisClient.get('order$$id$$' + order_id, function (err, reply) {
			const orderMetaData = JSON.parse(reply)
			if (orderMetaData) {
                // now we can use the api client to update the order status in Magento
                const client = Magento2Client(config.magento2.api);
                client.addMethods('invoice', function (restClient) {
                    var module = {};
                    
                    module.create = function () {
                        return restClient.post('/invoice/create'); // the real Magento2 endpoint should be here - this is just an example
                    }
                    return module;
                })
                client.invoice.create().then((result) => {
                    apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
                }).catch(err=> {
                    apiStatus(res, err, 500);
                })				
                                
            }
		})        
	})
	return mcApi
}
```

3. Add the extension to `config/local.json`:

```json
	"registeredExtensions": ["custom-payment-method"],
```

4. Restart the `vue-storefront-api`
5. Your new API method is available on `localhost:8080/api/ext/<extension_name>/<extension_method>` for example: `localhost:8080/api/ext/custom-payment-method/status`


In this extension above You may want to get the order data by the client side order id (passed to the payment service and probably returned with the notification). Then **You may use the Magento2 API to update the payment status** - probably by executing the `invoice` method.