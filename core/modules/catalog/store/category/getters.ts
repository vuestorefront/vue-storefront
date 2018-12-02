import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import CategoryState from '../../types/CategoryState'

const getters: GetterTree<CategoryState, RootState> = {
  getCurrentCategory: state => state.current,
  getCurrentCategoryPath: state => state.current_path,
  getAllCategoryFilters: state => state.filters,
  getCategoryActiveFilters: state => state.filters.chosen,
  getCategoryAvailableFilters: state => state.filters.available,
  getCategorySearchOptions: state => state.current_product_query,
  getCategories: state => state.list,
  getCategoryBreadcrumbs: state => state.breadcrumbs,
  /**
   * @deprecated use getCurrentCategory instead
   */
  current: (state) => state.current,
  /**
   * @deprecated use getCaterories instead
   */
  list: (state) => state.list
}

export default getters
