module.exports = {
  description: 'New part of checkout - useBillingFactory, inside core',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5552',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'core',
      before: 'Integrations implement useCheckout',
      after: 'Integrations implement useBilling',
      comment: 'New factories dedicated for the checkout'
    }
  ],
  author: 'Fifciu',
  linkToGitHubAccount: 'https://github.com/Fifciu'
};
