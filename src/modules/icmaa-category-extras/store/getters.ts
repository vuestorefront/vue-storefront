import { GetterTree } from 'vuex'
import CategoryExtrasState, { CategoryExtrasStateItem, CategoryExtrasCategoryIdMapStateItem } from '../types/CategoryExtrasState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category';
import RootState from '@vue-storefront/core/types/RootState'
import { Logo } from '../helpers/categoryExtras/logo'

const getters: GetterTree<CategoryExtrasState, RootState> = {
  getCategoryExtras: (state) => state.items,
  getCategoryExtrasByUrlKey: (state) => (identifier): CategoryExtrasStateItem => {
    return state.items.find(item => item.identifier === identifier)
  },
  getCategoryExtrasByCurrentCategory: (state, getters, rootState, rootGetters): CategoryExtrasStateItem|boolean => {
    const category = rootGetters['category-next/getCurrentCategory']
    return category ? getters.getCategoryExtrasByUrlKey(category.url_key) : false
  },
  getCategoryBy: (state, getters, rootState, rootGetters) => (key: string, value: any): Category|boolean => {
    return rootGetters['category-next/getCategories'].find(c => c[key] === value)
  },
  getLogolineItems: (state, getters, rootState, rootGetters) => (categories: Category[], type: string = 'crossreferenceInLogoline'): Logo[] => {
    let logos = []
    categories.forEach(c => {
      const extras = getters.getCategoryExtrasByUrlKey(c.url_key)
      if (extras && extras.hasLogo && extras[type]) {
        logos.push(new Logo(c))
      }
    })

    return logos
  },
  getSpotifyLogolineItemsByCurrentCategory: (state, getters, rootState, rootGetters): Logo[]|boolean => {
    const relatedArtistsCategories = rootGetters['icmaaSpotify/getRelatedArtistsCategoriesByCurrentCategory']
    if (relatedArtistsCategories.length > 0) {
      return getters.getLogolineItems(relatedArtistsCategories)
    }

    return false
  },
  getDepartmentChildCategoryIdMap: (state): CategoryExtrasCategoryIdMapStateItem => {
    return state.departmentChildCategoryIdMap
  },
  isDepartmentChildCategory: (state) => (categoryId: number): boolean => {
    return Object.values(state.departmentChildCategoryIdMap)
      .filter(categoryIds => categoryIds.filter(c => c === categoryId).length > 0)
      .length > 0
  },
  getCurrentProductDepartmentCategoryId: (state, getters, rootState, rootGetters): number|false => {
    const product = rootGetters['product/getCurrentProduct']
    if (product && product.category) {
      return product.category.map(c => c.category_id).find(id => getters.isDepartmentChildCategory(id))
    }

    return false
  },
  getCurrentProductDepartmentCategory: (state, getters, rootState, rootGetters): Category => {
    return getters.getCategoryBy('id', getters.getCurrentProductDepartmentCategoryId)
  }
}

export default getters
