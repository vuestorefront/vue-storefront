import config from 'config'
import { GetterTree } from 'vuex'
import CategoryExtrasState, { CategoryExtras, CategoryExtrasCategoryIdMapStateItem, CategoryExtrasContentHeaderContent } from '../types/CategoryExtrasState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'
import RootState from '@vue-storefront/core/types/RootState'
import { Logo } from '../helpers/categoryExtras/logo'
import { getCategoryExtrasKeyByAttribute } from '../helpers/'
import isEmpty from 'lodash-es/isEmpty'
import mapKeys from 'lodash-es/mapKeys'
import pick from 'lodash-es/pick'

const mapCategoryExtrasAttributes = (category: Category) => {
  const ceKeys = Object.keys(category).filter(k => /^ce[A-Z]/.test(k))
  category = pick(category, ceKeys)
  return mapKeys(category, (v, key) => key.charAt(2).toLowerCase() + key.slice(3))
}

const getters: GetterTree<CategoryExtrasState, RootState> = {
  getCategoryExtrasByUrlKey: (state, getters, rootState, rootGetters) => (url_key: string): CategoryExtras => {
    let category: Category = rootGetters['category-next/getCategories'].find(c => c.url_key === url_key)
    if (category) {
      return mapCategoryExtrasAttributes(category)
    }

    return null
  },
  getCategoryExtrasByCurrentCategory: (state, getters): CategoryExtras|boolean => {
    let category: Category = getters.getCurrentCategory
    if (category) {
      return mapCategoryExtrasAttributes(category)
    }

    return null
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
  getLogolineItems: () => (categories: Category[], type: string|boolean = false): Logo[] => {
    let logos: Logo[] = []
    const typeKey: string = type ? getCategoryExtrasKeyByAttribute(type as string) : ''

    categories.forEach(c => {
      if (c['ceHasLogo'] === true && (!type || (c[typeKey] && c[typeKey] === true))) {
        logos.push(new Logo(c, c['ceCluster']))
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
  getCurrentProductDepartmentCategory: (state, getters): Category => {
    return getters.getCategoryBy('id', getters.getCurrentProductDepartmentCategoryId)
  },
  getContentHeaderByUrlKey: (state) => (url_key: string): CategoryExtrasContentHeaderContent[] | boolean => {
    return state.categoryContentHeader[url_key] || false
  },
  getContentHeaderByCurrentCategory: (state, getters, rootState, rootGetters): CategoryExtrasContentHeaderContent[] | boolean => {
    const currentCategory: Category = rootGetters['category-next/getCurrentCategory']
    return getters.getContentHeaderByUrlKey(currentCategory.url_key)
  }
}

export default getters
