module.exports = {
  description: 'refactor(commercetools): fix the frontend client bundling the commercetools-sdk and apollo client',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6066',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'api-client',
      before: 'the "createCommerceToolsConnection" were being exported by the api-client',
      after: 'the "createCommerceToolsConnection" is not being exported anymore',
      comment: 'to use the current connection, you will need to access the context to call the API'
    }
  ],
  author: 'bloodf',
  linkToGitHubAccount: 'https://github.com/bloodf'
};
