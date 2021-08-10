module.exports = {
  description: 'Add new getter for orders total and change return value of searchOrders',
  link: 'https://github.com/vuestorefront/vue-storefront/issues/5968',
  isBreaking: false,
  breakingChanges: [{
    module: 'Commercetools composables',
    before: 'searchOrders returned array of results',
    after: 'searchOrders return object containing results and total',
    comment: 'In Vue template use orders.value.results instead of orders.value and you should be fine'
  }],
  author: 'Baroshem',
  linkToGitHubAccount: 'https://github.com/Baroshem'
};
