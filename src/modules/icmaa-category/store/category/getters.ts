import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import forEach from 'lodash-es/forEach'

const getters: GetterTree<CategoryState, RootState> = {
  getCategoryFrom: (state, getters) => (path: string = '') => {
    return getters.getCategories.find(category => path.replace(/^(\/)/gm, '') === category.url_path) || {}
  },
  getCategoryByParams: (state, getters, rootState) => (params: { [key: string]: string } = {}) => {
    return getters.getCategories.find(category => {
      let valueCheck = []
      forEach(params, (value, key) => valueCheck.push(category[key] === value))
      return valueCheck.filter(check => check === true).length === Object.keys(params).length
    }) || {}
  },
  getCurrentCategory: (state, getters, rootState) => {
    return getters.getCategoryByParams(rootState.route.params)
  }
}

export default getters
