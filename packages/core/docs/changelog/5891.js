module.exports = {
  description: 'Remove unused `checkoutGetters`.',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5891',
  isBreaking: true,
  breakingChanges: [
    {
      module: '`@vue-storefront/core`',
      before: '`checkoutGetters` was deprecated, but available in the API',
      after: 'Removed `checkoutGetters`',
      comment: '`checkoutGetters` was removed'
    }
  ],
  author: 'Łukasz Jędrasik',
  linkToGitHubAccount: 'https://github.com/lukaszjedrasik'
};
