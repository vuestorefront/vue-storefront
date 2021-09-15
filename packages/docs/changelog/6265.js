module.exports = {
  description: 'Fix loading user and cart information',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6265/',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'Base theme',
      before: '`loadCart` was called directly inside `setup` method in `CartSidebar.vue` component',
      after: '`loadCart` is called inside `onSSR` callback in `CartSidebar.vue` component',
      comment: 'Calling `loadCart` directly inside `setup` method caused hydration issues, since cart information was not properly loaded during SSR'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
