module.exports = {
  description: 'Remove unused `checkoutGetters`.',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5891',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'core and boilerplate',
      before: 'Using checkoutGetters',
      after: 'Removed `checkoutGetters`',
      comment: '`checkoutGetters are not used anymore.`'
    }
  ],
  author: 'Łukasz Jędrasik',
  linkToGitHubAccount: 'https://github.com/lukaszjedrasik'
};
