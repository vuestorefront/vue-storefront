module.exports = {
  description: 'Token refactor',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6329',
  isBreaking: true,
  breakingChanges: [
    {
      module: '@vue-storefront/composition-api',
      before: '`isGuest` endpoint returned `true` only for guest sessions',
      after: '`isGuest` endpoint returns `true` for guest and anonymous sessions',
      comment: 'Anonymous session is created when guest adds items to the cart or wishlist, but doesn\'t login.'
    },
    {
      module: '@vue-storefront/commercetools-theme',
      before: 'User-specific composables were loaded during SSR and in components that used the data',
      after: 'User-specific composables are loading in browser from `default.vue` layout',
      comment: 'To be able to cache pages, we load all user-specific composables like `useUser`, `useCart` and `useWishlist` from the browser (using `onMounted` instead of `onSSR`) instead of during Server Side Rendering.'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
