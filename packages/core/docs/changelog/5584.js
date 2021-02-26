module.exports = {
  description: 'Add \'useMakeOrder\' and rename composable \'useUserOrders\' to \'useUserOrder\'',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/5584',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'core and commercetools',
      before: 'useUserOrders',
      after: 'useUserOrder',
      comment: 'Renamed composable \'useUserOrders\' to \'useUserOrder\'.'
    },
    {
      module: 'core and commercetools',
      before: '\'placeOrder\' from \'useCheckout\' composable was used to place new orders.',
      after: 'Added new \'useMakeOrder\' composable and used it\'s \'make\' function to place new orders.',
      comment: 'Use new \'useMakeOrder\' composable to place orders.'
    }
  ],
  author: 'Filip Sobol',
  linkToGitHubAccount: 'https://github.com/filipsobol'
};
