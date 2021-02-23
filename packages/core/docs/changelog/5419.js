module.exports = {
  description: 'New part of checkout - shipping details, inside core and commercetools',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5552',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'nuxt-theme-module',
      before: 'CartPreview.vue uses checkoutGetters',
      after: 'CartPreview.vue is implemented per integration as we do not use getters for checkout-related stuff',
      comment: 'We have to implement CartPreview component per integration'
    }
  ],
  author: 'Fifciu',
  linkToGitHubAccount: 'https://github.com/Fifciu'
};
