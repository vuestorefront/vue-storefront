module.exports = {
  description: 'New part of checkout - hipping details, inside core and commercetools',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5552',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'commercetools',
      before: 'Using checkoutGetters',
      after: 'Removed checoutGetters. Accesing checkout-related properties directly.',
      comment: 'It is probably impossible to keep enough flexibility and have checkout getters'
    },
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
    },
    {
      module: 'nuxt-theme-module',
      before: 'CartPreview.vue uses checkoutGetters',
      after: 'CartPreview.vue uses component implemented per integration called ShippingPriceInfo.vue',
      comment: 'As we resign from checkout getters, by this move we could miss copying whole component to each integration. Now we have to only implement this small part in each integration.'
    }
  ],
  author: 'Fifciu',
  linkToGitHubAccount: 'https://github.com/Fifciu'
};
