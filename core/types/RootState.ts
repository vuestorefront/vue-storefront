export default interface RootState {
  version: string,
  __DEMO_MODE__: boolean,
  config: any,
  cart: any,
  checkout: any,
  cms: any,
  compare: any,
  product: any,
  shipping: any,
  user: any,
  wishlist: any,
  attribute: any,
  ui: any,
  newsletter: any,
  category: {
    current_path: string,
    current_product_query: any,
    current: {
      slug: string,
      name: string
    },
    filters: any
  },
  stock: {
    cache: any
  },
  storeView: any,
  twoStageCachingDelta1: number,
  twoStageCachingDelta2: number,
  twoStageCachingDisabled: boolean,
  userTokenInvalidated: string | null,
  userTokenInvalidateAttemptsCount: number,
  userTokenInvalidateLock: number,
  route?: any,
  url: any
}
