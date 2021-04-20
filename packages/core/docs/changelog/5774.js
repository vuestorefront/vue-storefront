module.exports = {
  description: 'Pass integration configuration to \'extendApp\'',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5774',
  isBreaking: true,
  breakingChanges: [
    {
      module: '@vue-storefront/middleware',
      before: '`extendApp` accepted only Express.js app as a parameter: `extendApp(app)`',
      after: '`extendApp` accepts object containing `app` and `configuration` properties: `extendApp({ app, configuration })`',
      comment: 'Allow access to integration configuration when extending application.'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
