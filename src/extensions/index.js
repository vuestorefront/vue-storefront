export default [
  require('src/extensions/custom_extension'),
  require('src/extensions/payment-cash-on-delivery'),
  require('src/extensions/payment-backend-methods'),
  require('src/extensions/mailchimp-subscribe'),
  require('src/extensions/google-analytics'),
  require('vue-storefront-stripe/index.js') // if you need to have BABEL applied to extensions inside node_modules (by default excluded from BABEL) please add ".js" file ext inside require
]
