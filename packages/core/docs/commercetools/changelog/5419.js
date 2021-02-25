module.exports = {
  description: 'New part of checkout - shipping details, inside core and commercetools',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5552',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'commercetools',
      before: 'Checkout/UserShippingAddresses.vue - shippingAddresses props, emiting changeSetAsDefault event, not using useUserShipping',
      after: 'accessing shippingAddresses via useUserShipping, emiting update:setAsDefault to use props.sync',
      comment: 'Refactor of Checkout/UserShippingAddresses.vue component'
    },
    {
      module: 'commercetools',
      before: 'Using checkoutGetters in pages/Checkout/OrderReview.vue',
      after: 'Accessing properties directly. Using new helper - getShippingMethodPrice for transforming price (to do not break the DRY rule)',
      comment: 'Got rid of getters in pages/Checkout/OrderReview.vue'
    }
  ],
  author: 'Fifciu',
  linkToGitHubAccount: 'https://github.com/Fifciu'
};
