module.exports = {
  description: 'Upgrade @nuxtjs/composition-api to 0.29.0 and @nuxt/types to 2.15.8',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6250/',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'enterprise packages',
      before: '`@vue/composition-api` is used by enterprise packages',
      after: '`@nuxtjs/composition-api` should be used as peerdependency by enterprise packages',
      comment: 'After releasing new version `@vue-storefront/core` and `@vue-storefront/nuxt` `@nuxtjs/composition-api` should be used inside `commercetools`, `adyen`, `auth0`, `useReview`, `useFacet`, `useUserBilling`, `useUserShipping`, `useWishlist`, `bazaarvoice` as peerdependency.'
    }
  ],
  author: 'Rafał Dobrowolski',
  linkToGitHubAccount: 'https://github.com/RafalDobrowolski'
};

