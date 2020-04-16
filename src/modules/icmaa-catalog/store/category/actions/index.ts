import { ActionTree } from 'vuex'
import * as types from '@vue-storefront/core/modules/catalog-next/store/category/mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import { products, entities } from 'config'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { buildFilterProductsQuery } from '@vue-storefront/core/helpers'
import { _prepareCategoryPathIds } from '@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

import { icmaa, icmaa_catalog } from 'config'
import intersection from 'lodash-es/intersection'
import union from 'lodash-es/union'

/**
 * These methods are overwrites of the original ones to extend them for our needs
 */
const actions: ActionTree<CategoryState, RootState> = {
  /**
   * Changes:
   * * Add custom `includeFields`/`excludeFields` loaded via getter
   * * Disable child-configuration in `processCategoryProducts`
   */
  async loadCategoryProducts ({ commit, getters, dispatch, rootState }, { route, category, pageSize = 50 } = {}) {
    const searchCategory = category || getters.getCategoryFrom(route.path) || {}
    const categoryMappedFilters = getters.getFiltersMap[searchCategory.id]
    const areFiltersInQuery = !!Object.keys(route[products.routerFiltersSource]).length
    if (!categoryMappedFilters && areFiltersInQuery) { // loading all filters only when some filters are currently chosen and category has no available filters yet
      await dispatch('loadCategoryFilters', searchCategory)
    }
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource], categoryMappedFilters)
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)

    const { includeFields, excludeFields } = entities.productList
    const sort = searchQuery.sort || `${products.defaultSortBy.attribute}:${products.defaultSortBy.order}`

    // Add our custom category filter
    // @see DivanteLtd/vue-storefront#4111
    filterQr.applyFilter({ key: 'stock', value: '' })
    if (!searchQuery.sort) {
      filterQr.applySort({ field: 'is_in_sale', options: { 'missing': '_first' } })
    }

    const {items, perPage, start, total, aggregations, attributeMetadata} = await quickSearchByQuery({
      query: filterQr,
      sort,
      includeFields,
      excludeFields,
      size: pageSize
    })
    await dispatch('loadAvailableFiltersFrom', {
      aggregations,
      attributeMetadata,
      category: searchCategory,
      filters: searchQuery.filters
    })
    commit(types.CATEGORY_SET_SEARCH_PRODUCTS_STATS, { perPage, start, total })
    const configuredProducts = await dispatch('processCategoryProducts', { products: items, filters: searchQuery.filters })
    commit(types.CATEGORY_SET_PRODUCTS, configuredProducts)

    return items
  },
  /**
   * Changes:
   * * Add custom `includeFields`/`excludeFields` loaded via getter
   * * Disable child-configuration in `processCategoryProducts`
   */
  async loadMoreCategoryProducts ({ commit, getters, rootState, dispatch }) {
    const { perPage, start, total } = getters.getCategorySearchProductsStats
    const totalValue = typeof total === 'object' ? total.value : total
    if (start >= totalValue || totalValue < perPage) return

    const searchQuery = getters.getCurrentSearchQuery
    let filterQr = buildFilterProductsQuery(getters.getCurrentCategory, searchQuery.filters)

    const { includeFields, excludeFields } = entities.productList
    const sort = searchQuery.sort || `${products.defaultSortBy.attribute}:${products.defaultSortBy.order}`

    // Add our custom category filter
    // @see DivanteLtd/vue-storefront#4111
    filterQr.applyFilter({ key: 'stock', value: '' })
    if (!searchQuery.sort) {
      filterQr.applySort({ field: 'is_in_sale', options: { 'missing': '_first' } })
    }

    const searchResult = await quickSearchByQuery({
      query: filterQr,
      sort,
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
   * * Be able to don't configure the conf product and therefore:
   *   * overwrite original image by selected variants one
   *   * overwrite products who got the same children (unisex-products)
   */
  async processCategoryProducts ({ dispatch, rootState }, { products = [], filters = {}, configureChildProduct } = {}) {
    await dispatch('tax/calculateTaxes', { products: products }, { root: true })
    dispatch('registerCategoryProductsMapping', products) // we don't need to wait for this

    let configureChild = true
    if (configureChildProduct !== undefined) {
      configureChild = configureChildProduct
    } else if (icmaa_catalog.entities.category.configureChildProductsInCategoryList !== undefined) {
      configureChild = icmaa_catalog.entities.category.configureChildProductsInCategoryList
    }

    return configureChild ? dispatch('configureProducts', { products, filters }) : products
  },
  /**
   * Changes:
   * * Add category whitelist support to hide unimportant categories
   * * Don't load it using `loadCategories` because the result might overwrite the current category in state
   */
  async loadCategoryBreadcrumbs ({ dispatch, getters }, { category, currentRouteName, omitCurrent = false }) {
    if (!category) {
      return dispatch('breadcrumbs/set', { current: currentRouteName, routes: [] }, { root: true })
    }

    let categoryHierarchyIds = _prepareCategoryPathIds(category).map(id => Number(id))
    let whitelistCategoryHierarchyIds = intersection(categoryHierarchyIds, icmaa.breadcrumbs.whitelist)
    if (whitelistCategoryHierarchyIds.length > 0) {
      categoryHierarchyIds = union(whitelistCategoryHierarchyIds, categoryHierarchyIds.slice(-1))
    } else {
      categoryHierarchyIds = whitelistCategoryHierarchyIds
    }

    const filters = { 'id': categoryHierarchyIds }
    const categories = await dispatch('findCategories', { filters })

    categories.sort((a, b) => a.level - b.level)
    const routes = categories.map(c => {
      return { name: c.name, route_link: formatCategoryLink(c) }
    })

    await dispatch('breadcrumbs/set', { current: currentRouteName, routes }, { root: true })
    return categories
  }
}

export default actions
