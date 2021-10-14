module.exports = {
  description: 'Token refactor',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6329',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'Theme',
      before: 'User-specific composables were loaded during SSR and in components that used the data',
      after: 'User-specific composables are loading in browser from `default.vue` layout',
      comment: 'To be able to cache pages, we load all user-specific composables like `useUser`, `useCart` and `useWishlist` from the browser (using `onMounted` instead of `onSSR`) instead of during Server Side Rendering.'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
