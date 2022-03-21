module.exports = {
  description: 'Fix the `CustomQueryFn` type in core',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6681',
  isBreaking: true,
  breakingChanges: [
    {
      module: '@vue-storefront/core',
      before: 'The `CustomQueryFn` type had inproper parameters',
      after: 'The `CustomQueryFn` type has parameters as expected by the Server Middleware',
      comment: ''
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
