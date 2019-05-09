import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'

const getters: GetterTree<CategoryState, RootState> = {
  getCategories: (state) => state.categories,
  getCategoryProducts: (state) => state.products,
  getAvailableFilters: state => state.availableFilters,
  getCurrentCategory: (state, getters, routeState) => {
    return getters.getCategories.find(category => routeState.route.path.includes(category.url_path)) || {}
  }
}

export default getters
