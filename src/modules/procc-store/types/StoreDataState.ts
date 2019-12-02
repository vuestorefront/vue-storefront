export default interface StoreDataState {
  banners: {
    mainBanners: any[],
    smallBanners: any[],
    productBanners: any[]
  },
  headImage: Record<string, any>
}
