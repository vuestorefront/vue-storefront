module.exports = {
  description: 'Fix infinite loading for login and register by implementing error handling in core module and in LoginModal',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5508',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'core/middleware, LoginModal',
      before: 'There was no error handling and thats why the infinite loading was appearing',
      after: 'Errors are handled immediately',
      comment: 'add try/catch to middleware, set more appriopriate value to err.value in useUserFactory, and implement error handling in LoginModal'
    }
  ],
  author: 'Baroshem',
  linkToGitHubAccount: 'https://github.com/Baroshem'
};
