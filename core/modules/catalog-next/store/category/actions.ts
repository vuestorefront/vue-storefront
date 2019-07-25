// import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { buildFilterProductsQuery } from '@vue-storefront/core/helpers'
import { router } from '@vue-storefront/core/app'
import FilterVariant from '../../types/FilterVariant'
import { CategoryService } from '@vue-storefront/core/data-resolver'
import { changeFilterQuery } from '../../helpers/filterHelpers'
import { products, entities } from 'config'
import { configureProductAsync } from '@vue-storefront/core/modules/catalog/helpers'
import { DataResolver } from 'core/data-resolver/types/DataResolver';
import { Category } from '../../types/Category';
import { _prepareCategoryPathIds } from '../../helpers/categoryHelpers';
import chunk from 'lodash-es/chunk'
import Product from 'core/modules/catalog/types/Product';

const actions: ActionTree<CategoryState, RootState> = {
  async loadCategoryProducts ({ commit, getters, dispatch, rootState }, { route, category } = {}) {
    const searchCategory = category || getters.getCategoryFrom(route.path)
    await dispatch('loadCategoryFilters', searchCategory)
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource])
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)
    const {items, perPage, start, total} = await quickSearchByQuery({
      query: filterQr,
      sort: searchQuery.sort,
      includeFields: entities.productList.includeFields,
      excludeFields: entities.productList.excludeFields
    })
    commit(types.CATEGORY_SET_SEARCH_PRODUCTS_STATS, { perPage, start, total })
    let configuredProducts = items.map(product => {
      const configuredProductVariant = configureProductAsync({rootState}, {product, configuration: searchQuery.filters, selectDefaultVariant: false, fallbackToDefaultWhenNoAvailable: true, setProductErorrs: false})
      return Object.assign(product, configuredProductVariant)
    })
    commit(types.CATEGORY_SET_PRODUCTS, configuredProducts)
    // await dispatch('loadAvailableFiltersFrom', searchResult)

    return items
  },
  async loadMoreCategoryProducts ({ commit, getters, rootState }) {
    const { perPage, start, total } = getters.getCategorySearchProductsStats
    if (start >= total || total < perPage) return

    const searchQuery = getters.getCurrentSearchQuery
    let filterQr = buildFilterProductsQuery(getters.getCurrentCategory, searchQuery.filters)
    const searchResult = await quickSearchByQuery({
      query: filterQr,
      sort: searchQuery.sort,
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
    let configuredProducts = searchResult.items.map(product => {
      const configuredProductVariant = configureProductAsync({rootState, state: {current_configuration: {}}}, {product, configuration: searchQuery.filters, selectDefaultVariant: false, fallbackToDefaultWhenNoAvailable: true, setProductErorrs: false})
      return Object.assign(product, configuredProductVariant)
    })
    commit(types.CATEGORY_ADD_PRODUCTS, configuredProducts)

    return searchResult.items
  },
  async cacheProducts ({ commit, getters, dispatch, rootState }, { route } = {}) {
    const searchCategory = getters.getCategoryFrom(route.path)
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource])
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)

    const cachedProductsResponse = await dispatch('product/list', {
      query: filterQr,
      sort: searchQuery.sort,
      updateState: false // not update the product listing - this request is only for caching
    }, { root: true })
    if (products.filterUnavailableVariants && products.configurableChildrenStockPrefetchStatic) { // prefetch the stock items
      const skus = []
      let prefetchIndex = 0
      cachedProductsResponse.items.map(i => {
        if (products.configurableChildrenStockPrefetchStaticPrefetchCount > 0) {
          if (prefetchIndex > products.configurableChildrenStockPrefetchStaticPrefetchCount) return
        }
        skus.push(i.sku) // main product sku to be checked anyway
        if (i.type_id === 'configurable' && i.configurable_children && i.configurable_children.length > 0) {
          for (const confChild of i.configurable_children) {
            const cachedItem = rootState.stock.cache[confChild.id]
            if (typeof cachedItem === 'undefined' || cachedItem === null) {
              skus.push(confChild.sku)
            }
          }
          prefetchIndex++
        }
      })
      for (const chunkItem of chunk(skus, 15)) {
        dispatch('stock/list', { skus: chunkItem }, { root: true }) // store it in the cache
      }
    }
  },
  async findCategories (context, categorySearchOptions: DataResolver.CategorySearchOptions): Promise<Category[]> {
    return CategoryService.getCategories(categorySearchOptions)
  },
  async loadCategories ({ commit }, categorySearchOptions: DataResolver.CategorySearchOptions): Promise<Category[]> {
    const categories = await CategoryService.getCategories(categorySearchOptions)
    commit(types.CATEGORY_ADD_CATEGORIES, categories)
    return categories
  },
  async loadCategory ({ commit }, categorySearchOptions: DataResolver.CategorySearchOptions): Promise<Category> {
    const categories: Category[] = await CategoryService.getCategories(categorySearchOptions)
    const category: Category = categories && categories.length ? categories[0] : null
    commit(types.CATEGORY_ADD_CATEGORY, category)
    return category
  },
  /**
   * Fetch and process filters from current category and sets them in available filters.
   */
  async loadCategoryFilters ({ dispatch, getters }, category) {
    const searchCategory = category || getters.getCurrentCategory
    let filterQr = buildFilterProductsQuery(searchCategory)
    const searchResult = await quickSearchByQuery({ query: filterQr })
    await dispatch('loadAvailableFiltersFrom', searchResult)
  },
  async loadAvailableFiltersFrom ({ commit, getters }, {aggregations}) {
    const filters = getters.getAvailableFiltersFrom(aggregations)
    commit(types.CATEGORY_SET_AVAILABLE_FILTERS, filters)
  },
  async switchSearchFilter ({ dispatch }, filterVariant: FilterVariant) {
    const newQuery = changeFilterQuery({currentQuery: router.currentRoute[products.routerFiltersSource], filterVariant})
    await dispatch('changeRouterFilterParameters', newQuery)
  },
  async resetSearchFilters ({dispatch}) {
    await dispatch('changeRouterFilterParameters', {})
  },
  async changeRouterFilterParameters (context, query) {
    router.push({[products.routerFiltersSource]: query})
  },
  async loadCategoryBreadcrumbs ({ dispatch, getters }, category: Category) {
    if (!category) return
    const categoryHierarchyIds = _prepareCategoryPathIds(category) // getters.getCategoriesHierarchyMap.find(categoryMapping => categoryMapping.includes(category.id))
    const categoryFilters = { 'id': categoryHierarchyIds }
    await dispatch('loadCategories', {filters: categoryFilters})
  },
  async loadProductCategories ({ dispatch }, product: Product) {
    let categoryIds = []
    if (!product) return categoryIds
    if (product && product.category_ids) categoryIds = product.category_ids
    const categoryFilters = { 'id': categoryIds }
    return dispatch('loadCategories', {filters: categoryFilters})
  }
}

export default actions
