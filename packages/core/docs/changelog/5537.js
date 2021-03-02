module.exports = {
  description: 'create update newsletter sections functionality',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5537',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'useNewsletter',
      before: 'there was no functionality for saving newsletter data',
      after: 'checked newsletter sections are saved in memory as mocked so that when user navigates pages the checkboxes remain checked. Next step would be to save the mocked values to DB',
      comment: 'create update newsletter sections functionality'
    }
  ],
  author: 'Baroshem',
  linkToGitHubAccount: 'https://github.com/Baroshem'
};
