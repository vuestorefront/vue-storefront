module.exports = {
  description: 'get api host from middleware url',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6680',
  isBreaking: true,
  breakingChanges: [
    {
      module: '@vue-storefront/core',
      before: 'The `middlewareUrl` property was optional',
      after: 'The `middlewareUrl` is required',
      comment: 'The `middlewareUrl` property in the `nuxt.config.js` file is now required. Please follow the instruction in the Migration Guide.'
    }
  ],
  author: 'Dawid Ziobro',
  linkToGitHubAccount: 'https://github.com/dawid-ziobro'
};
