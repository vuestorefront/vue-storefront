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
    }
  ],
  author: 'Justyna Gieracka',
  linkToGitHubAccount: 'https://github.com/justyna-13'
};
