import { ActionTree } from 'vuex'
import * as types from '@vue-storefront/core/modules/catalog-next/store/category/mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import { products, entities } from 'config'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { buildFilterProductsQuery, isServer } from '@vue-storefront/core/helpers'
import { _prepareCategoryPathIds } from '@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers'
import { parseCategoryPath } from '@vue-storefront/core/modules/breadcrumbs/helpers'

import { icmaa } from 'config'
import intersection from 'lodash-es/intersection'
import union from 'lodash-es/union'

/**
 * These methods are overwrites of the original ones to extend them for our needs
 */
const actions: ActionTree<CategoryState, RootState> = {
  /**
   * Changes:
   * * Add custom `includeFields`/`excludeFields` loaded via getter
   */
  async loadCategoryProducts ({ commit, getters, dispatch }, { route, category, pageSize = 50 } = {}) {
    const searchCategory = category || getters.getCategoryFrom(route.path) || {}
    const categoryMappedFilters = getters.getFiltersMap[searchCategory.id]
    const areFiltersInQuery = !!Object.keys(route[products.routerFiltersSource]).length
    if (!categoryMappedFilters && areFiltersInQuery) { // loading all filters only when some filters are currently chosen and category has no available filters yet
      await dispatch('loadCategoryFilters', searchCategory)
    }
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource], categoryMappedFilters)
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)
    const { includeFields, excludeFields } = getters.getIncludeExcludeFields(searchCategory)
    const { items, perPage, start, total, aggregations } = await quickSearchByQuery({
      query: filterQr,
      sort: searchQuery.sort,
      includeFields,
      excludeFields,
      size: pageSize
    })
    await dispatch('loadAvailableFiltersFrom', {aggregations, category: searchCategory, filters: searchQuery.filters})
    commit(types.CATEGORY_SET_SEARCH_PRODUCTS_STATS, { perPage, start, total })
    const configuredProducts = await dispatch('processCategoryProducts', { products: items, filters: searchQuery.filters })
    commit(types.CATEGORY_SET_PRODUCTS, configuredProducts)

    return items
  },
  /**
   * Changes:
   * * Add custom `includeFields`/`excludeFields` loaded via getter
   */
  async loadMoreCategoryProducts ({ commit, getters, rootState, dispatch }) {
    const { perPage, start, total } = getters.getCategorySearchProductsStats
    const totalValue = typeof total === 'object' ? total.value : total
    if (start >= totalValue || totalValue < perPage) return

    const searchQuery = getters.getCurrentSearchQuery
    let filterQr = buildFilterProductsQuery(getters.getCurrentCategory, searchQuery.filters)
    const { includeFields, excludeFields } = getters.getIncludeExcludeFields(getters.getCurrentCategory)
    const searchResult = await quickSearchByQuery({
      query: filterQr,
      sort: searchQuery.sort,
      start: start + perPage,
      size: perPage,
      includeFields,
      excludeFields
    })
    commit(types.CATEGORY_SET_SEARCH_PRODUCTS_STATS, {
      perPage: searchResult.perPage,
      start: searchResult.start,
      total: searchResult.total
    })
    const configuredProducts = await dispatch('processCategoryProducts', { products: searchResult.items, filters: searchQuery.filters })
    commit(types.CATEGORY_ADD_PRODUCTS, configuredProducts)

    return searchResult.items
  },
  /**
   * Changes:
   * * Add category whitelist support to hide unimportant categories
   */
  async loadCategoryBreadcrumbs ({ dispatch, getters }, { category, currentRouteName, omitCurrent = false }) {
    if (!category) return
    let categoryHierarchyIds = _prepareCategoryPathIds(category).map(id => Number(id))
    let whitelistCategoryHierarchyIds = intersection(categoryHierarchyIds, icmaa.breadcrumbs.whitelist)
    if (whitelistCategoryHierarchyIds.length > 0) {
      categoryHierarchyIds = union(whitelistCategoryHierarchyIds, categoryHierarchyIds.slice(-1))
    } else {
      categoryHierarchyIds = whitelistCategoryHierarchyIds
    }

    const categoryFilters = { 'id': categoryHierarchyIds.map(id => id.toString()) }
    const categories = await dispatch('loadCategories', { filters: categoryFilters })
    const sorted = []
    for (const id of categoryHierarchyIds) {
      const index = categories.findIndex(cat => cat.id === id)
      if (index >= 0 && (!omitCurrent || categories[index].id !== category.id)) {
        sorted.push(categories[index])
      }
    }
    await dispatch('breadcrumbs/set', { current: currentRouteName, routes: parseCategoryPath(sorted) }, { root: true })
    return sorted
  }
}

export default actions
