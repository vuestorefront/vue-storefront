export default [
  require('src/extensions/custom_extension/index.js').default,
  require('src/extensions/payment-cash-on-delivery/index.js').default,
  require('src/extensions/payment-backend-methods/index.js').default,
  require('src/extensions/mailchimp-subscribe/index.js').default,
  require('src/extensions/google-analytics/index.js').default,

  require('vue-storefront-stripe/index.js').default
]
