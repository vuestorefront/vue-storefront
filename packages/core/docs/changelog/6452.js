module.exports = {
  description: 'feat: update Composition API to 1.2.4',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6452',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'Theme',
      before: 'Composition API module was registered internally by Vue Storefront modules',
      after: 'Composition API module must be registered inside projects',
      comment: 'Please refer to the migration guide for more information'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
