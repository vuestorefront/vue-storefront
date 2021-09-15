module.exports = {
  description: 'Fix loading user and cart information',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6265/',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'commercetools theme',
      before: '`loadUser` was called directly inside `setup` method in `CartSidebar.vue` component',
      after: '`loadUser` is called inside `onSSR` callback in `CartSidebar.vue` component',
      comment: 'Calling `loadUser` directly inside `setup` method caused hydration issues, since cart information was not properly loaded during SSR. Additionally cart will now be automatically updated after calling `load` from the `useUser` composable, the same way as it happens when calling `logIn`, `logOut` and `register`.'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
