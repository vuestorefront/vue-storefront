import config from 'config'
import { GetterTree } from 'vuex'
import CategoryExtrasState, { CategoryExtrasStateItem, CategoryExtrasCategoryIdMapStateItem, CategoryExtrasDepartmentLogoStateItem } from '../types/CategoryExtrasState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category';
import RootState from '@vue-storefront/core/types/RootState'
import { Logo } from '../helpers/categoryExtras/logo'
import isEmpty from 'lodash-es/isEmpty'

const getters: GetterTree<CategoryExtrasState, RootState> = {
  getCategoryExtras: (state) => state.items,
  getCategoryExtrasByUrlKey: (state) => (identifier): CategoryExtrasStateItem => {
    return state.items.find(item => item.identifier === identifier)
  },
  getCategoryExtrasByCurrentCategory: (state, getters, rootState, rootGetters): CategoryExtrasStateItem|boolean => {
    const category = getters.getCurrentCategory
    return category ? getters.getCategoryExtrasByUrlKey(category.url_key) : false
  },
  getCurrentCategory: (state, getters, rootState, rootGetters): Category|boolean => {
    let category = rootGetters['category-next/getCurrentCategory']
    if (!category || isEmpty(category)) {
      category = getters.getCurrentProductDepartmentCategory
    }

    return category
  },
  getCategoryBy: (state, getters, rootState, rootGetters) => (key: string, value: any): Category|boolean => {
    return rootGetters['category-next/getCategories'].find(c => c[key] === value)
  },
  getLogolineItems: (state, getters, rootState, rootGetters) => (categories: Category[], type: string = 'crossreferenceInLogoline'): Logo[] => {
    let logos = []
    categories.forEach(c => {
      const logo = getters.getDepartmentLogosByUrlKey(c.url_key)
      if (logo && logo[type]) {
        logos.push(new Logo(c, logo.customerCluster))
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
  getChildCategoryIdMap: (state): CategoryExtrasCategoryIdMapStateItem[] => {
    return state.childCategoryIdMap
  },
  getCategoryChildrenMap: (state, getters) => (parentId: number): CategoryExtrasCategoryIdMapStateItem => {
    return getters.getChildCategoryIdMap.find(c => c.parentId === parentId)
  },
  getDepartmentChildCategoryIdMap: (state): CategoryExtrasCategoryIdMapStateItem[] => {
    const { parentDepartmentCategoryIds } = config.icmaa_categoryextras
    return state.childCategoryIdMap.filter(c => parentDepartmentCategoryIds.includes(c.parentId))
  },
  isDepartmentChildCategory: (state, getters) => (categoryId: number): boolean => {
    return getters.getDepartmentChildCategoryIdMap
      .filter(c => c.children.filter(c => c.id === categoryId).length > 0)
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
  },
  getDepartmentLogos: (state): CategoryExtrasDepartmentLogoStateItem[] => {
    return state.departmentLogos
  },
  getDepartmentLogosByUrlKey: (state) => (identifier): CategoryExtrasDepartmentLogoStateItem => {
    return state.departmentLogos.find(item => item.identifier === identifier)
  }
}

export default getters
