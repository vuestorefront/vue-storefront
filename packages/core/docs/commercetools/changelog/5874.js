module.exports = {
  description: 'Router hooks added',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5874',
  isBreaking: false,
  breakingChanges: [
    {
      module: 'nuxt component context',
      before: '"$router" and "$route" are available in component context',
      after: '"$router" and "$route" are not available in component context',
      comment: 'Should use "useRouter" and "useRoute" hooks instead "$router" and "$route" context fields'
    }
  ],
  author: 'vn-vlad',
  linkToGitHubAccount: 'https://github.com/vn-vlad'
};
