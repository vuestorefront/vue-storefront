export default interface StoreCategoriesState {
  banners: {
    mainBanners: any[],
    smallBanners: any[],
    productBanners: any[]
  },
  headImage: Record<string, any>
}
