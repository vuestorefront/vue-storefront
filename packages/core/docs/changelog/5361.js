module.exports = {
  description: 'Implementation of api middleware',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5361',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'core',
      before: 'apiClientFactory',
      after: 'apiClientFactory',
      comment: 'Api client factory is being called only on our middleware. It is no longer supported in the borwser. For client-side interaction please use proxied version'
    }
  ],
  author: 'Patryk Andrzejewski',
  linkToGitHubAccount: 'https://github.com/andrzejewsky'
};
