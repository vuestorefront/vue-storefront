export default interface CategoryState {
  list: any,
  current: any,
  filters: {
    available: any,
    chosen: any
  },
  breadcrumbs: {
    routes: any
  },
  current_product_query: any,
  current_path: any,
  sidebar_selected_categories: any
}
