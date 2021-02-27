module.exports = {
  description: 'New Payment API for Checkout',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5587',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'core',
      before: 'Dedicated composable for whole checkout',
      after: 'Dedicated composable for Shipping, Billing and Provider components'
    }
  ],
  author: 'Fifciu',
  linkToGitHubAccount: 'https://github.com/Fifciu'
};
