module.exports = {
  description: 'added MegaMenu to theme',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5267',
  isBreaking: true,
  breakingChanges: [
    {
      module: '/components/Header',
      before: 'not exist',
      after: 'Header.vue, LocaleSelector.vue, TopBar.vue have been moved into Header directory'
    },
    {
      module: '/components/Header/AppHeader.vue',
      before: 'Navigation as a list',
      after: 'Moved navigation into /components/Header/HeaderNav.vue'
    }
  ],
  author: 'Łukasz Jędrasik',
  linkToGitHubAccount: 'https://github.com/lukaszjedrasik'
};
