export interface PagedProductList {
  start: number,
  perPage: number,
  items: any[]
}

export default interface ProductState {
  breadcrumbs: {
    routes: any[],
    name: string
  },
  current: any,
  current_options: any,
  current_configuration: any,
  parent: any,
  list: any[] | PagedProductList,
  original: any,
  related: any,
  offlineImage: any,
  current_custom_options: any,
  current_bundle_options: any,
  custom_options_validators: any,
  productLoadStart: number,
  productLoadPromise: Promise<any> | null,
  productGallery: any
}
