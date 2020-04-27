import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { buildFilterProductsQuery, isServer } from '@vue-storefront/core/helpers'
import { router } from '@vue-storefront/core/app'
import { currentStoreView, localizedDispatcherRoute, localizedDispatcherRouteName } from '@vue-storefront/core/lib/multistore'
import FilterVariant from '../../types/FilterVariant'
import { CategoryService } from '@vue-storefront/core/data-resolver'
import { changeFilterQuery } from '../../helpers/filterHelpers'
import { products, entities } from 'config'
import { configureProductAsync } from '@vue-storefront/core/modules/catalog/helpers'
import { DataResolver } from 'core/data-resolver/types/DataResolver';
import { Category } from '../../types/Category';
import { _prepareCategoryPathIds } from '../../helpers/categoryHelpers';
import { prefetchStockItems } from '../../helpers/cacheProductsHelper';
import { preConfigureProduct } from '@vue-storefront/core/modules/catalog/helpers/search'
import chunk from 'lodash-es/chunk'
import Product from 'core/modules/catalog/types/Product';
import omit from 'lodash-es/omit'
import cloneDeep from 'lodash-es/cloneDeep'
import config from 'config'
import { parseCategoryPath } from '@vue-storefront/core/modules/breadcrumbs/helpers'

const actions: ActionTree<CategoryState, RootState> = {
  async loadCategoryProducts ({ commit, getters, dispatch, rootState }, { route, category, pageSize = 50 } = {}) {
    const searchCategory = category || getters.getCategoryFrom(route.path) || {}
    const categoryMappedFilters = getters.getFiltersMap[searchCategory.id]
    const areFiltersInQuery = !!Object.keys(route[products.routerFiltersSource]).length
    if (!categoryMappedFilters && areFiltersInQuery) { // loading all filters only when some filters are currently chosen and category has no available filters yet
      await dispatch('loadCategoryFilters', searchCategory)
    }
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource], categoryMappedFilters)
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)
    const { items, perPage, start, total, aggregations } = await quickSearchByQuery({
      query: filterQr,
      sort: searchQuery.sort || `${products.defaultSortBy.attribute}:${products.defaultSortBy.order}`,
      includeFields: entities.productList.includeFields,
      excludeFields: entities.productList.excludeFields,
      size: pageSize
    })
    await dispatch('loadAvailableFiltersFrom', { aggregations, category: searchCategory, filters: searchQuery.filters })
    commit(types.CATEGORY_SET_SEARCH_PRODUCTS_STATS, { perPage, start, total })
    const configuredProducts = await dispatch('processCategoryProducts', { products: items, filters: searchQuery.filters })
    commit(types.CATEGORY_SET_PRODUCTS, configuredProducts)

    return items
  },
  async loadMoreCategoryProducts ({ commit, getters, rootState, dispatch }) {
    const { perPage, start, total } = getters.getCategorySearchProductsStats
    const totalValue = typeof total === 'object' ? total.value : total
    if (start >= totalValue || totalValue < perPage) return

    const searchQuery = getters.getCurrentSearchQuery
    let filterQr = buildFilterProductsQuery(getters.getCurrentCategory, searchQuery.filters)
    const searchResult = await quickSearchByQuery({
      query: filterQr,
      sort: searchQuery.sort || `${products.defaultSortBy.attribute}:${products.defaultSortBy.order}`,
      start: start + perPage,
      size: perPage,
      includeFields: entities.productList.includeFields,
      excludeFields: entities.productList.excludeFields
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
  async cacheProducts ({ commit, getters, dispatch, rootState }, { route } = {}) {
    const searchCategory = getters.getCategoryFrom(route.path) || {}
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource])
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)

    const cachedProductsResponse = await dispatch('product/list', { // configure and calculateTaxes is being executed in the product/list - we don't need another call in here
      query: filterQr,
      sort: searchQuery.sort,
      updateState: false // not update the product listing - this request is only for caching
    }, { root: true })
    if (products.filterUnavailableVariants) { // prefetch the stock items
      const skus = prefetchStockItems(cachedProductsResponse, rootState.stock.cache)

      for (const chunkItem of chunk(skus, 15)) {
        dispatch('stock/list', { skus: chunkItem }, { root: true }) // store it in the cache
      }
    }
  },
  /**
   * Calculates products taxes
   * Registers URLs
   * Configures products
   */
  async processCategoryProducts ({ dispatch, rootState }, { products = [], filters = {} } = {}) {
    const configuredProducts = await dispatch('configureProducts', { products, filters })
    dispatch('registerCategoryProductsMapping', products) // we don't need to wait for this
    return dispatch('tax/calculateTaxes', { products: configuredProducts }, { root: true })
  },
  /**
   * Configure configurable products to have first available options selected
   * so they can be added to cart/wishlist/compare without manual configuring
   */
  async configureProducts ({ rootState }, { products = [], filters = {}, populateRequestCacheTags = config.server.useOutputCacheTagging } = {}) {
    return products.map(product => {
      product = Object.assign({}, preConfigureProduct({ product, populateRequestCacheTags }))
      const configuredProductVariant = configureProductAsync({ rootState, state: { current_configuration: {} } }, { product, configuration: filters, selectDefaultVariant: false, fallbackToDefaultWhenNoAvailable: true, setProductErorrs: false })
      return Object.assign(product, omit(configuredProductVariant, ['visibility']))
    })
  },
  async registerCategoryProductsMapping ({ dispatch }, products = []) {
    const { storeCode, appendStoreCode } = currentStoreView()
    await Promise.all(products.map(product => {
      const { url_path, sku, slug, type_id } = product
      return dispatch('url/registerMapping', {
        url: localizedDispatcherRoute(url_path, storeCode),
        routeData: {
          params: { parentSku: product.sku, slug },
          'name': localizedDispatcherRouteName(type_id + '-product', storeCode, appendStoreCode)
        }
      }, { root: true })
    }))
  },
  async findCategories (context, categorySearchOptions: DataResolver.CategorySearchOptions): Promise<Category[]> {
    return CategoryService.getCategories(categorySearchOptions)
  },
  async loadCategories ({ commit, getters }, categorySearchOptions: DataResolver.CategorySearchOptions): Promise<Category[]> {
    const searchingByIds = !(!categorySearchOptions || !categorySearchOptions.filters || !categorySearchOptions.filters.id)
    const searchedIds: string[] = searchingByIds ? [...categorySearchOptions.filters.id].map(String) : []
    const loadedCategories: Category[] = []
    if (searchingByIds && !categorySearchOptions.reloadAll) { // removing from search query already loaded categories, they are added to returned results
      for (const [categoryId, category] of Object.entries(getters.getCategoriesMap)) {
        if (searchedIds.includes(categoryId)) {
          loadedCategories.push(category as Category)
        }
      }
      categorySearchOptions.filters.id = searchedIds.filter(categoryId => !getters.getCategoriesMap[categoryId] && !getters.getNotFoundCategoryIds.includes(categoryId))
    }
    if (!searchingByIds || categorySearchOptions.filters.id.length) {
      categorySearchOptions.filters = Object.assign(cloneDeep(config.entities.category.filterFields), categorySearchOptions.filters ? cloneDeep(categorySearchOptions.filters) : {})
      const categories = await CategoryService.getCategories(categorySearchOptions)
      if (Vue.prototype.$cacheTags) {
        categories.forEach(category => {
          Vue.prototype.$cacheTags.add(`C${category.id}`)
        })
      }
      const notFoundCategories = searchedIds.filter(categoryId => !categories.some(cat => cat.id === parseInt(categoryId)))

      commit(types.CATEGORY_ADD_CATEGORIES, categories)
      commit(types.CATEGORY_ADD_NOT_FOUND_CATEGORY_IDS, notFoundCategories)
      return [...loadedCategories, ...categories]
    }
    return loadedCategories
  },
  async loadCategory ({ commit }, categorySearchOptions: DataResolver.CategorySearchOptions): Promise<Category> {
    const categories: Category[] = await CategoryService.getCategories(categorySearchOptions)
    const category: Category = categories && categories.length ? categories[0] : null
    if (Vue.prototype.$cacheTags) {
      Vue.prototype.$cacheTags.add(`C${category.id}`)
    }
    commit(types.CATEGORY_ADD_CATEGORY, category)
    return category
  },
  /**
   * Fetch and process filters from current category and sets them in available filters.
   */
  async loadCategoryFilters ({ dispatch, getters }, category) {
    const searchCategory = category || getters.getCurrentCategory
    let filterQr = buildFilterProductsQuery(searchCategory)
    const { aggregations } = await quickSearchByQuery({
      query: filterQr,
      size: config.products.maxFiltersQuerySize,
      excludeFields: ['*']
    })
    await dispatch('loadAvailableFiltersFrom', { aggregations, category })
  },
  async loadAvailableFiltersFrom ({ commit, getters }, { aggregations, category, filters = {} }) {
    const aggregationFilters = getters.getAvailableFiltersFrom(aggregations)
    const currentCategory = category || getters.getCurrentCategory
    const categoryMappedFilters = getters.getFiltersMap[currentCategory.id]
    let resultFilters = aggregationFilters
    const filtersKeys = Object.keys(filters)
    if (categoryMappedFilters && filtersKeys.length) {
      resultFilters = Object.assign(cloneDeep(categoryMappedFilters), cloneDeep(omit(aggregationFilters, filtersKeys)))
    }
    commit(types.CATEGORY_SET_CATEGORY_FILTERS, { category, filters: resultFilters })
  },
  async switchSearchFilters ({ dispatch }, filterVariants: FilterVariant[] = []) {
    let currentQuery = router.currentRoute[products.routerFiltersSource]
    filterVariants.forEach(filterVariant => {
      currentQuery = changeFilterQuery({ currentQuery, filterVariant })
    })
    await dispatch('changeRouterFilterParameters', currentQuery)
  },
  async resetSearchFilters ({ dispatch }) {
    await dispatch('changeRouterFilterParameters', {})
  },
  async changeRouterFilterParameters (context, query) {
    router.push({ [products.routerFiltersSource]: query })
  },
  async loadCategoryBreadcrumbs ({ dispatch, getters }, { category, currentRouteName, omitCurrent = false }) {
    if (!category) return
    const categoryHierarchyIds = _prepareCategoryPathIds(category) // getters.getCategoriesHierarchyMap.find(categoryMapping => categoryMapping.includes(category.id))
    const categoryFilters = Object.assign({ 'id': categoryHierarchyIds }, cloneDeep(config.entities.category.breadcrumbFilterFields))
    const categories = await dispatch('loadCategories', { filters: categoryFilters, reloadAll: Object.keys(config.entities.category.breadcrumbFilterFields).length > 0 })
    const sorted = []
    for (const id of categoryHierarchyIds) {
      const index = categories.findIndex(cat => cat.id.toString() === id)
      if (index >= 0 && (!omitCurrent || categories[index].id !== category.id)) {
        sorted.push(categories[index])
      }
    }
    await dispatch('breadcrumbs/set', { current: currentRouteName, routes: parseCategoryPath(sorted) }, { root: true })
    return sorted
  }
}

export default actions
