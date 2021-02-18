module.exports = {
  description: 'New part of checkout - Billing details, inside core and commercetools',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5552',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'commercetools-theme',
      before: 'UserBillingAddress works properly with pages/Checkout/Payment.vue',
      after: 'UserBillingAddress works properly with pages/CheckoutV2/Payment.vue',
      comment: 'Customized components to work with new checkout which has pages inside CheckoutV2 directory'
    }
  ],
  author: 'Fifciu',
  linkToGitHubAccount: 'https://github.com/Fifciu'
};
