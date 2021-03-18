module.exports = {
  description: 'Implementation of api middleware',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5577',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'core',
      before: 'customQuery was used as a function',
      after: 'customQuery is a key-value object',
      comment: 'The key is a query name, value is the name of a new query function, defined in the middleware config'
    }
  ],
  author: 'Patryk Andrzejewski',
  linkToGitHubAccount: 'https://github.com/andrzejewsky'
};
