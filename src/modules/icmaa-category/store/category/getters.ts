import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'
import { getSearchOptionsFromRouteParams } from '../../helpers/categoryHelpers'
import forEach from 'lodash-es/forEach'

const getters: GetterTree<CategoryState, RootState> = {
  /**
   * Getters are cached by default. This leads to the problem that if you fetch categories using
   * getter.getCategories you won't get a correct value when the category route changes to a new category.
   * The solution is to force the getter not be cached by returning a method.
   */
  getCategories: (state) => (): Category[] => Object.values(state.categoriesMap),
  getCategoryFrom: (state, getters) => (path: string = '') => {
    return getters.getCategories().find(category => path.replace(/^(\/)/gm, '') === category.url_path) || {}
  },
  getCategoryByParams: (state, getters, rootState) => (params: { [key: string]: string } = {}) => {
    return getters.getCategories().find(category => {
      let valueCheck = []
      const searchOptions = getSearchOptionsFromRouteParams(params)
      forEach(searchOptions, (value, key) => valueCheck.push(category[key] && category[key] === (category[key].constructor)(value)))
      return valueCheck.filter(check => check === true).length === Object.keys(searchOptions).length
    }) || {}
  },
  getCurrentCategory: (state, getters, rootState) => {
    return getters.getCategoryByParams(rootState.route.params)
  }
}

export default getters
