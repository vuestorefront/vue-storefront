import Product from './Product';

export interface PagedProductList {
  start: number,
  perPage: number,
  total: number,
  items: Product[]
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
  list: PagedProductList,
  original: any,
  related: { [key: string]: Product[] },
  offlineImage: any,
  current_custom_options: any,
  current_bundle_options: any,
  custom_options_validators: any,
  productLoadStart: number,
  productLoadPromise: Promise<any> | null,
  productGallery: any
}
