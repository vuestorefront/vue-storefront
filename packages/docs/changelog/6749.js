module.exports = {
  description: 'feat: init function in the middleware',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6749',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'core',
      before: 'createServer was a sync function',
      after: 'createServer is now an async function',
      comment: 'Check architecture -> middleware doc\'s page for more details'
    }
  ],
  author: 'Bartosz Herba',
  linkToGitHubAccount: 'https://github.com/bartoszherba'
};
