import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import CategoryState from '../../types/CategoryState'

const getters: GetterTree<CategoryState, RootState> = {
  getCurrentCategory: state => state.current,
  getCategoryActiveFilters: state => state.filters.chosen,
  getCategoryAvailableFilters: state => state.filters.available,
  /**
   * @deprecated use getCurrentCategory
   */
  current: (state) => state.current,
  list: (state) => state.list
}

export default getters
