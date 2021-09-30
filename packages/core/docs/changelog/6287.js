module.exports = {
  description: 'Changed how `getAgnosticStatusCode` is retrieving error code. It first looks at axios model, then on apollo, then custom with recursion protected to 3 levels down in depth.',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6287',
  isBreaking: false,
  breakingChanges: [],
  author: 'Dawid Ziobro',
  linkToGitHubAccount: 'https://github.com/dawid-ziobro'
};
