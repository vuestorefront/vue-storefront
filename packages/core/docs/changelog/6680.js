module.exports = {
  description: 'get api host from middleware url',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6680',
  isBreaking: true,
  breakingChanges: [
    'middlewareUrl has to be configured for nuxt. Please follow instruction in migration guide for version 2.5.7.'
  ],
  author: 'Dawid Ziobro',
  linkToGitHubAccount: 'https://github.com/dawid-ziobro'
};
