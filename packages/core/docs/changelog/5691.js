module.exports = {
  description: 'update Storefront UI version',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5691',
  isBreaking: true,
  breakingChanges: [
    {
      module: '/composables/useUiState.ts',
      before: 'toggleCategoryGridView',
      after: 'changeToCategoryGridView, changeToCategoryListView',
      comment: 'toggleCategoryGridView has been divided into two functions: changeToCategoryGridView and changeToCategoryListView'
    }
  ],
  author: 'Justyna Gieracka',
  linkToGitHubAccount: 'https://github.com/justyna-13'
};
