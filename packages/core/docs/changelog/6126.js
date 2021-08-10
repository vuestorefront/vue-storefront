module.exports = {
  description: 'updated the removeCoupon interface to match the applyCoupon',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6126',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'composables',
      before: 'the useCart composable method removeCoupon was using this call signature: ({ coupon: COUPON, customQuery?: CustomQuery })  ',
      after: 'the method signature was changed to: ({ couponCode: string, customQuery?: CustomQuery })  ',
      comment: 'on each removeCoupon composable usage need to change the "coupon" to "couponCode"'
    }
  ],
  author: 'Heitor Ramon Ribeiro',
  linkToGitHubAccount: 'https://github.com/bloodf'
};
