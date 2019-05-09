import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'

const getters: GetterTree<CategoryState, RootState> = {
  getCategories: (state) => state.categories,
  getCategoryProducts: (state) => state.products,
  getAvailableFilters: state => state.availableFilters
}

export default getters
