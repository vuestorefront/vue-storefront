module.exports = {
  description: 'Added `is-authenticated` middleware to protect user profile routes from guest access. By default it emits an error message asking to implement vendor-specific validation.',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5442',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'middleware/is-authenticated.js',
      before: '-',
      after: '[Link](https://docs.vuestorefront.io/v2/integrate/integration-guide.html#creating-a-middleware)',
      comment: 'Create new middleware that checks if customer is logged in, and if not, redirects to homepage.'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
