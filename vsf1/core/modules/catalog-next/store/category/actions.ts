import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { buildFilterProductsQuery } from '@vue-storefront/core/helpers'
import { router } from '@vue-storefront/core/app'
import { localizedDispatcherRoute } from '@vue-storefront/core/lib/multistore'
import FilterVariant from '../../types/FilterVariant'
import { CategoryService } from '@vue-storefront/core/data-resolver'
import { changeFilterQuery } from '../../helpers/filterHelpers'
import { products, entities } from 'config'
import { DataResolver } from 'core/data-resolver/types/DataResolver';
import { Category } from '../../types/Category';
import { _prepareCategoryPathIds } from '../../helpers/categoryHelpers';
import { prefetchStockItems } from '../../helpers/cacheProductsHelper';
import chunk from 'lodash-es/chunk'
import omit from 'lodash-es/omit'
import cloneDeep from 'lodash-es/cloneDeep'
import config from 'config'
import { parseCategoryPath } from '@vue-storefront/core/modules/breadcrumbs/helpers'
import createCategoryListQuery from '@vue-storefront/core/modules/catalog/helpers/createCategoryListQuery'
import { transformCategoryUrl } from '@vue-storefront/core/modules/url/helpers/transformUrl';

const actions: ActionTree<CategoryState, RootState> = {
  async loadCategoryProducts ({ commit, getters, dispatch, rootState }, { route, category, pageSize = 50 } = {}) {
    const searchCategory = category || getters.getCategoryFrom(route.path) || {}
    const areFiltersInQuery = !!Object.keys(route[products.routerFiltersSource]).length
    let categoryMappedFilters = getters.getFiltersMap[searchCategory.id]
    if (!categoryMappedFilters && areFiltersInQuery) { // loading all filters only when some filters are currently chosen and category has no available filters yet
      await dispatch('loadCategoryFilters', searchCategory)
      categoryMappedFilters = getters.getFiltersMap[searchCategory.id]
    }
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource], categoryMappedFilters)
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)
    const { items, perPage, start, total, aggregations, attributeMetadata } = await dispatch('product/findProducts', {
      query: filterQr,
      sort: searchQuery.sort || `${products.defaultSortBy.attribute}:${products.defaultSortBy.order}`,
      includeFields: entities.productList.includeFields,
      excludeFields: entities.productList.excludeFields,
      size: pageSize,
      configuration: searchQuery.filters,
      options: {
        populateRequestCacheTags: true,
        prefetchGroupProducts: false,
        setProductErrors: false,
        fallbackToDefaultWhenNoAvailable: true,
        assignProductConfiguration: false,
        separateSelectedVariant: false
      }
    }, { root: true })
    await dispatch('loadAvailableFiltersFrom', {
      aggregations,
      attributeMetadata,
      category: searchCategory,
      filters: searchQuery.filters
    })
    commit(types.CATEGORY_SET_SEARCH_PRODUCTS_STATS, { perPage, start, total })
    commit(types.CATEGORY_SET_PRODUCTS, items)

    return items
  },
  async loadMoreCategoryProducts ({ commit, getters, rootState, dispatch }) {
    const { perPage, start, total } = getters.getCategorySearchProductsStats
    const totalValue = typeof total === 'object' ? total.value : total
    if (start >= totalValue || totalValue < perPage) return

    const searchQuery = getters.getCurrentSearchQuery
    let filterQr = buildFilterProductsQuery(getters.getCurrentCategory, searchQuery.filters)
    const searchResult = await dispatch('product/findProducts', {
      query: filterQr,
      sort: searchQuery.sort || `${products.defaultSortBy.attribute}:${products.defaultSortBy.order}`,
      start: start + perPage,
      size: perPage,
      includeFields: entities.productList.includeFields,
      excludeFields: entities.productList.excludeFields,
      configuration: searchQuery.filters,
      options: {
        populateRequestCacheTags: true,
        prefetchGroupProducts: false,
        setProductErrors: false,
        fallbackToDefaultWhenNoAvailable: true,
        assignProductConfiguration: false,
        separateSelectedVariant: false
      }
    }, { root: true })
    commit(types.CATEGORY_SET_SEARCH_PRODUCTS_STATS, {
      perPage: searchResult.perPage,
      start: searchResult.start,
      total: searchResult.total
    })

    commit(types.CATEGORY_ADD_PRODUCTS, searchResult.items)

    return searchResult.items
  },
  async cacheProducts ({ commit, getters, dispatch, rootState }, { route } = {}) {
    if (config.api.saveBandwidthOverCache) {
      return
    }

    const searchCategory = getters.getCategoryFrom(route.path) || {}
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource])
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)

    const cachedProductsResponse = await dispatch('product/findProducts', {
      query: filterQr,
      sort: searchQuery.sort,
      options: {
        populateRequestCacheTags: false,
        prefetchGroupProducts: false
      }
    }, { root: true })
    if (products.filterUnavailableVariants) { // prefetch the stock items
      const skus = prefetchStockItems(cachedProductsResponse, rootState.stock.cache)

      for (const chunkItem of chunk(skus, 15)) {
        dispatch('stock/list', { skus: chunkItem }, { root: true }) // store it in the cache
      }
    }
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
      const notFoundCategories = searchedIds.filter(categoryId => !categories.some(cat => cat.id === parseInt(categoryId) || cat.id === categoryId))

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
    const { aggregations, attributeMetadata } = await quickSearchByQuery({
      query: filterQr,
      size: config.products.maxFiltersQuerySize,
      excludeFields: ['*']
    })
    await dispatch('loadAvailableFiltersFrom', { aggregations, attributeMetadata: attributeMetadata, category })
  },
  async loadAvailableFiltersFrom ({ commit, getters, dispatch }, { aggregations, attributeMetadata, category, filters = {} }) {
    if (config.entities.attribute.loadByAttributeMetadata) {
      await dispatch('attribute/loadCategoryAttributes', { attributeMetadata }, { root: true })
    }
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
    const categoryHierarchyIds = category.parent_ids ? [...category.parent_ids, category.id] : _prepareCategoryPathIds(category) // getters.getCategoriesHierarchyMap.find(categoryMapping => categoryMapping.includes(category.id))
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
  },
  /**
   * Load categories within specified parent
   * @param {Object} commit promise
   * @param {Object} parent parent category
   */
  async fetchMenuCategories ({ commit, getters, dispatch }, {
    parent = null,
    key = null,
    value = null,
    level = null,
    onlyActive = true,
    onlyNotEmpty = false,
    size = 4000,
    start = 0,
    sort = 'position:asc',
    includeFields = (config.entities.optimize ? config.entities.category.includeFields : null),
    excludeFields = (config.entities.optimize ? config.entities.category.excludeFields : null),
    skipCache = false
  }) {
    const { searchQuery, isCustomizedQuery } = createCategoryListQuery({ parent, level, key, value, onlyActive, onlyNotEmpty })
    const shouldLoadCategories = skipCache || isCustomizedQuery

    if (shouldLoadCategories) {
      const resp = await quickSearchByQuery({ entityType: 'category', query: searchQuery, sort, size, start, includeFields, excludeFields })

      await dispatch('registerCategoryMapping', { categories: resp.items })

      commit(types.CATEGORY_UPD_MENU_CATEGORIES, { items: resp.items })

      return resp
    }

    const list = { items: getters.getMenuCategories, total: getters.getMenuCategories.length }

    return list
  },
  async registerCategoryMapping ({ dispatch }, { categories }) {
    for (let category of categories) {
      if (category.url_path) {
        await dispatch('url/registerMapping', {
          url: localizedDispatcherRoute(category.url_path),
          routeData: transformCategoryUrl(category)
        }, { root: true })
      }
    }
  },
  /** Below actions are not used from 1.12 and can be removed to reduce bundle */
  ...require('./deprecatedActions').default
}

export default actions
