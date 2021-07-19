module.exports = {
  description: 'Upgrade nodejs min version to 12 and provide configuration for yarn v2   `',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6035',
  isBreaking: true,
  breakingChanges: [
    'requirement to use node v10+' +
    'utilization of yarn v2' +
    'requirement to create / maintain a npmjs auth '
  ],
  author: 'jaydubb12',
  linkToGitHubAccount: 'https://github.com/jaydubb12/vue-storefront'
};
