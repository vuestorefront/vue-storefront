module.exports = {
  description: 'Unify case of theme\'s directories',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5511',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'nuxt-theme-module',
      before: 'pages/Checkout.vue imported components from ~/components/checkout',
      after: 'pages/Checkout.vue imports components from ~/components/Checkout',
      comment: 'Nested directories should be in PascalCase. Remember to update imports'
    },
    {
      module: 'commercetools-theme',
      before: 'pages/Checkout.vue imported components from ~/components/checkout',
      after: 'pages/Checkout.vue imports components from ~/components/Checkout',
      comment: 'Nested directories should be in PascalCase. Remember to update imports'
    }
  ],
  author: 'Fifciu',
  linkToGitHubAccount: 'https://github.com/Fifciu'
};
