module.exports = {
  description: 'Update GraphQL API types',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6410',
  isBreaking: true,
  breakingChanges: [
    {
      module: '@vue-storefront/commercetools-api',
      before: 'Shipping address could contain `contactInfo` object with `phone`, `mobile`, `email` and `tax` properties',
      after: '`phone`, `mobile`, `email` and `tax` properties should be used directly on the address object, not nested in the `contactInfo` object',
      comment: 'In the past, the application logged a warning when `contactInfo` was present on the address object. Now we are deprecating it to match commercetools API'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
