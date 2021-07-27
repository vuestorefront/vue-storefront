module.exports = {
  description: 'updated the applyCoupon interface to match the removeCoupon',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6126',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'composables',
      before: 'the useCart composable method applyCoupon was using this call signature: ({ couponCode: string, customQuery?: CustomQuery })',
      after: 'the method signature was changed to: ({ coupon: COUPON, customQuery?: CustomQuery })',
      comment: 'on each applyCoupon composable usage need to change the "couponCode" to "coupon"'
    }
  ],
  author: 'Heitor Ramon Ribeiro',
  linkToGitHubAccount: 'https://github.com/bloodf'
};
