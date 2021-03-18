module.exports = {
  description: 'Quick search',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5566',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'useUiHelpers/index.ts',
      before: '{ changeSearchTerm } = useUiHelpers()',
      after: '{ setTermForUrl } = useUiHelpers();',
      comment: 'Changed changeSearchTerm name to setTermForUrl'
    },
    {
      module: 'useUiHelpers/index.ts',
      before: '',
      after: '{ getSearchTermFromUrl } = useUiHelpers();',
      comment: 'Created new function'
    },
    {
      module: '@vue-storefront/nuxt-theme',
      before: '',
      after: 'SearchResults.vue',
      comment: 'Added new \'SearchResults.vue\' component'
    },
    {
      module: '@vue-storefront/nuxt-theme',
      before: 'AppHeader.vue',
      after: 'AppHeader.vue',
      comment: 'Modified \'AppHeader.vue\' to add use new \'SearchResults.vue\' component'
    }
  ],
  author: 'Justyna Gieracka',
  linkToGitHubAccount: 'https://github.com/justyna-13'
};
