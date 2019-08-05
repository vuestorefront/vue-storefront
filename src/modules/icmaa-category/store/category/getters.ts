import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'
import forEach from 'lodash-es/forEach'

const getters: GetterTree<CategoryState, RootState> = {
  /**
   * Getters are cached by default. This leads to the problem that if you fetch categories using
   * getter.getCategories you won't get a correct value when the category route changes to a new category.
   * The solution is to force the getter not be cached by returning a method.
   */
  getCategoriesUncached: (state) => (): Category[] => Object.values(state.categoriesMap),
  getCategoryFrom: (state, getters) => (path: string = '') => {
    return getters.getCategories.find(category => path.replace(/^(\/)/gm, '') === category.url_path) || {}
  },
  getCategoryByParams: (state, getters, rootState) => (params: { [key: string]: string } = {}) => {
    return getters.getCategoriesUncached().find(category => {
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
