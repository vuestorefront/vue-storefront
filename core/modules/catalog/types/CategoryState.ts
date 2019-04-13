export default interface CategoryState {
  list: any,
  current: any,
  pagination: {
    perPage: Number,
    current: Number,
    enabled: Boolean
  },  
  filters: {
    available: any,
    chosen: any
  },
  breadcrumbs: {
    routes: any
  },
  current_product_query: any,
  current_path: any
}
