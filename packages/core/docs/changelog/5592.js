module.exports = {
  description: 'fix naming convention for isOnCart and isOnWishlist to isInCart and isInWishlist',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5592',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'commercetools',
      before: 'variables and methods had names isOnCart and isOnWishlist',
      after: 'variables and methods have names isInCart and isInWishlist',
      comment: 'fix naming convention for isOnCart and isOnWishlist to isInCart and isInWishlist'
    }
  ],
  author: 'Jakub Andrzejewski',
  linkToGitHubAccount: 'https://github.com/Baroshem'
};
