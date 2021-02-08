module.exports = {
  description: 'added error/success handling to login & registration form',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5377',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'nuxt-theme',
      before: 'LoginModal',
      after: 'AuthModal',
      comment: 'isLoginModal and toggleLoginModal was changed to isAuthModal and toggleAuthModal'
    }
  ],
  author: 'Łukasz Jędrasik',
  linkToGitHubAccount: 'https://github.com/lukaszjedrasik'
};
