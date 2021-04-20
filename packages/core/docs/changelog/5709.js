module.exports = {
  description: 'mocked results for search',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5709/files',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'acomposables/useUiHelpers/index.ts ',
      before: 'term',
      after: 'phrase',
      comment: 'term is changed to phrase'
    }
  ],
  author: 'Justyna Gieracka',
  linkToGitHubAccount: 'https://github.com/justyna-13'
};
