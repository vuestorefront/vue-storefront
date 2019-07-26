import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'

const getters: GetterTree<CategoryState, RootState> = {
  getCategoryFrom: (state, getters) => (path: string = '') => {
    return getters.getCategories.find(category => path.replace(/^(\/)/gm, '') === category.url_path) || {}
  },
  getCurrentCategory: (state, getters, rootState) => {
    if (state.currentId) {
      return getters.getCategories.find(category => category.id === state.currentId) || {}
    }

    return getters.getCategoryFrom(rootState.route.path)
  }
}

export default getters
