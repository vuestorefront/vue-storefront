# Working with extensions

Vue Storefront Core provides basic eCommerce features. Everything else should be available via extensions.

## How to write your own extension in Vue Storefront

If you would like to extend your Vue Storefront instance with additional functionality you can certainly do that via adding your own extensions.

All extensions are located in `/src/extensions` folder, each in its own directory.

If you want to make your own extension you should publish it as standalone npm package. The naming convention for Vue Storefront npm extensions is `vsf-{extension_name}` (see [example](https://www.npmjs.com/package/vsf-external-checkout?activeTab=readme) )

In each extension folder there need to be an `index.js` file that serves as an entry point of your extension.

`index.js` file needs to export a default function that receives 4 parameters - references to application instance, global router object, Vuex store and configuration file. Please check the code below:

```js
export default function (app, router, store, config) {
  ...
}
```

Inside of this function you can introduce your functionality and also extend application routes and Vuex store by registering extension own routes and store object, like the following:

```js
router.addRoutes(extensionRoutes);
store.registerModule(EXTENSION_KEY, extensionStore);
```

where

- `extensionRoutes` is a list of routes that can be defined in a separate file in your extension folder;
- `extensionStore` is an object that consists of Vuex store components - state, getters, actions and mutations;
- `EXTENSION_KEY` a string variable that defines a name of your extension Vuex store entry in a global Vuex store object.

`config` parameter is where default function refers to a `local.json` file in the root /config folder. You can define all your extension settings in that configuration file and access them through this parameter.

Custom extensions usually do use Events for hooking in some additional actions. If you don't find an event suitable for your action please don't hesitate to contribute a PR to the core adding this particular event.

The naming convention for the events is: `after-<module>-<action>` for example `after-product-saved`. Of course there can be `before-product-saved` event as well :)

If you want to provide some components for the themes please think of them as mixins (you can add default HTML markup) so they can be styled and modified in themes.

## How to install an extension

The enabled extensions must be declared within `src/extensions/index.js` file. You can also declare theme-specific extensions in `src/{your_theme}/extensions/index.js`.

You should just instantiate your extension adding it to the list:

```js
export default [
  require('src/extensions/custom_extension/index.js').default,
  require('src/extensions/payment-cash-on-delivery/index.js').default,
  require('src/extensions/payment-backend-methods/index.js').default,
  require('src/extensions/mailchimp-subscribe/index.js').default,
  require('src/extensions/google-analytics/index.js').default,

  require('vue-storefront-stripe/index.js').default,
];
```

## Creating a Payment Extension

Payments are handled solely via a Payment Extension. It behaves and is created like the above base Extension, however it is also expected to catch and emit a few more events to be a complete Payment Extension. The most basic version of a Payment Extension is the "src/extensions/cash-on-delivery".

- The Payment Extension where applicable should catch the 'checkout-payment-method-changed' event, if the payment method code is the desired one, then you have the option to dynamically inject any components into the order review section on the checkout, (for example credit card input fields, payment method information etc).
- You are required to catch the 'checkout-before-placeOrder' event and do any processing required for the payment method before placing the order.
- You are required to emit the 'checkout-do-placeOrder' event with an optional payload to complete the place order process.
- To display your payment method you need to add it to the Payment Methods collection in the storage 'app.$store.state.payment.methods.push(paymentMethodConfig)'
- Unregister any events when they are no longer required.
- For clarity in growing extensions, payment extensions should be named clearly 'payment-{VENDOR}-{PAYMENT_METHOD}'

## Extensions list (docs under construction)

- Stripe Payments
- Cash On Delivery (a minimal but working payment extension demo)
- Mailchimp Integration
- Google Analytics Integration
- [Droppoint shipping](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/extensions/droppoint-shipping.md)
- [Example of custom extension](https://github.com/DivanteLtd/vue-storefront/tree/master/src/extensions/template) - can be used as a boilerplate

## Related

- [Extending Vue Storefront API](extending-api.md)
