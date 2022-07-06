module.exports = {
  description: 'fix: update registerIntegrations function to accommodate async change for each iteration. After changing the registerIntegration function to an async function the reduce loop did not accumulate integrations data due to a non-resolved promise. Now each iteration will be properly accumulated in the response object.',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6779',
  isBreaking: false,
  breakingChanges: [],
  author: 'Bartosz Herba',
  linkToGitHubAccount: 'https://github.com/bartoszherba'
};
