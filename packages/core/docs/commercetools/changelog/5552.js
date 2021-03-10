module.exports = {
  description: 'New part of checkout - Billing details, inside core and commercetools',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5552',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'commercetools-theme',
      before: 'UserBillingAddress works properly',
      after: 'New API inside Checkout/UserBillingAddress.vue',
      comment: 'Customized components to work with new checkout'
    }
  ],
  author: 'Fifciu',
  linkToGitHubAccount: 'https://github.com/Fifciu'
};
