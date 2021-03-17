module.exports = {
  description: 'Properly parse module options by using "<%= serialize(options) %>" instead of "JSON.parse(\'<%= JSON.stringify(options) %>\')"',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5664',
  isBreaking: false,
  breakingChanges: [],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
