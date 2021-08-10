module.exports = {
  description: 'Enable the purchase of item with selected supply channel and distribution channel',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/',
  isBreaking: true,
  breakingChanges: [
    {
      module: 'api-client',
      before: 'the addToCart method has the signature addToCart ({ id, version }: CartDetails, product: ProductVariant, quantity: number): Promise<CartResponse>;',
      after: 'now the addToCart method was change to enable the supply and distribution channels with the signature addToCart ({ id, version }: CartDetails, params: { product: ProductVariant; quantity: number; supplyChannel?: string; distributionChannel?: string;}): Promise<CartResponse>;',
      comment: 'The composable was changed to match this signature. The changes from Click & Collect / MultiStore are required to use this feature on Product.vue'
    }
  ],
  author: 'Alef Barbeli',
  linkToGitHubAccount: 'https://github.com/alefbarbeli'
};
