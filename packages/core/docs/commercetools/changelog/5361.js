module.exports = {
  description: 'Usage of api middleware',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5361',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'commercetools',
      before: 'one entrypoint',
      after: 'multiple entrypoints',
      comment: 'We expose multiple entrypoints for server and client side interaction'
    }
  ],
  author: 'Patryk Andrzejewski',
  linkToGitHubAccount: 'https://github.com/andrzejewsky'
};
