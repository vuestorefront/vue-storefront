# Extending UI from extensions

Although the general rule is that all the UI modifications [shold be done with Themes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/Working%20with%20themes.md) there are several use cases when the extensions developer need to modify the UI:

 * payment method extension is adding the "Paypal checkout" button to the Checkout,
 * google tracking code is injected into exsiting pages
 * ...

For such cases we provided the mechanism called "Composite". All the core components that have [Composite]() in the "mixins" can be extended via event hooks.

Let's take an example - [custom_extension](https://github.com/DivanteLtd/vue-storefront/blob/master/src/extensions/custom_extension/index.js) which is extending the "Thank you page"