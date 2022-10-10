module.exports = {
  description: 'feat!: make on create an async function #6807. Previously the apiClientFactory was a synchronous factory, but to handle asynchronous onCreate function execution it has to become an async funciton.',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6807',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'core',
      before: 'apiClientFactory was a sync function',
      after: 'apiClientFactory is now an async function because onCreate also become an async function',
      comment: 'Check architecture -> middleware doc\'s page for more details'
    }
  ],
  author: 'Bartosz Herba',
  linkToGitHubAccount: 'https://github.com/bartoszherba'
};
