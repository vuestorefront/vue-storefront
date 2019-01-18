import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '../../types/CategoryState'

const getters: GetterTree<CategoryState, RootState> = {
  getCurrentCategory: state => state.current,
  getCurrentCategoryPath: state => state.current_path,
  getAllCategoryFilters: state => state.filters,
  getActiveCategoryFilters: state => state.filters.chosen,
  getAvailableCategoryFilters: state => state.filters.available,
  getCurrentCategoryProductQuery: state => state.current_product_query,
  getCategories: state => state.list,
  getCategoryBreadcrumbs: state => state.breadcrumbs,
  /**
   * @deprecated use getCurrentCategory instead
   */
  current: (state, getters) => getters.getCurrentCategory,
  /**
   * @deprecated use getCategories instead
   */
  list: (state, getters) => getters.getCategories
}

export default getters
