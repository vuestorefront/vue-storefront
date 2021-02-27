module.exports = {
  description: 'Update Cache library',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5524',
  isBreaking: true,
  breakingChanges: [
    {
      module: '@vue-storefront/cache',
      before: '-',
      after: '-',
      comment: 'Please see "Advanced > SSR Cache" and "Build integration > Cache drive" pages in the documentation for more information.'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
