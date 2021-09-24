module.exports = {
  description: 'Upgrade @nuxtjs/composition-api to 0.29.0 and @nuxt/types to 2.15.8',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6250/',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'commercetools',
      before: '`@vue/composition-api` is used by commercetools',
      after: '`@nuxtjs/composition-api` is used by commercetools, tests have reference to `@vue/composition-api`',
      comment: '`@vue/composition-api` references is replaced by using `@nuxtjs/composition-api`, because `@nuxtjs/composition-api` includes `@vue/composition-api`.'
    }
  ],
  author: 'Rafał Dobrowolski',
  linkToGitHubAccount: 'https://github.com/RafalDobrowolski'
};

