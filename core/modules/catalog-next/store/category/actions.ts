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
import { changeFilterQuery } from './logic/categoryLogic'
import { products } from 'config'
import { configureProductAsync } from '@vue-storefront/core/modules/catalog/helpers'

const actions: ActionTree<CategoryState, RootState> = {
  /**
   * Initialise category module.
   * - gets available categories
   * - gets available filters for current category
   */
  async initCategoryModule ({ getters, dispatch }) {
    if (!getters.getCategories.length) {
      await dispatch('loadCategories')
    }
  },
  async loadCategoryProducts ({ commit, getters, dispatch }, { route } = {}) {
    await dispatch('initCategoryModule')
    const searchCategory = getters.getCategoryFrom(route.path)
    await dispatch('loadCategoryFilters', searchCategory)
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource])
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)
    const searchResult = await quickSearchByQuery({ query: filterQr, sort: searchQuery.sort })
    let configuredProducts = searchResult.items.map(product => {
      const configuredProductVariant = configureProductAsync({}, {product, configuration: searchQuery.filters, selectDefaultVariant: false, fallbackToDefaultWhenNoAvailable: true, setProductErorrs: false})
      return Object.assign(product, configuredProductVariant)
    })
    commit(types.CATEGORY_SET_PRODUCTS, configuredProducts)
    // await dispatch('loadAvailableFiltersFrom', searchResult)

    return searchResult.items
  },
  async cacheProducts ({ commit, getters, dispatch }, { route } = {}) {
    const searchCategory = getters.getCategoryFrom(route.path)
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource])
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)

    console.error('CACHE 2 step...')
    const xx = await dispatch('product/list', {
      query: filterQr,
      sort: searchQuery.sort,
      updateState: false // not update the product listing - this request is only for caching
    }, { root: true })
    console.error('RETURNED PRODUCTS', xx)

    // return searchResult.items
  },
  async findCategories () {
    return await CategoryService.getCategories()
  },
  async loadCategories ({ commit }) {
    const categories = await CategoryService.getCategories()
    commit(types.CATEGORY_SET_CATEGORIES, categories)
    return categories
  },
  /**
   * Fetch and process filters from current category and sets them in available filters.
   */
  async loadCategoryFilters ({ dispatch, getters }, category) {
    const searchCategory = category ? category : getters.getCurrentCategory
    let filterQr = buildFilterProductsQuery(searchCategory)
    const searchResult = await quickSearchByQuery({ query: filterQr })
    await dispatch('loadAvailableFiltersFrom', searchResult)
  },
  async loadAvailableFiltersFrom ({ commit, getters }, {aggregations}) {
    const filters = getters.getAvailableFiltersFrom(aggregations)
    commit(types.CATEGORY_SET_AVAILABLE_FILTERS, filters)
  },
  async switchSearchFilter({ dispatch }, filterVariant:FilterVariant) {
    const newQuery = changeFilterQuery({currentQuery: router.currentRoute[products.routerFiltersSource], filterVariant})
    await dispatch('changeRouterFilterParameters', newQuery)
  },
  async resetFilters({dispatch}) {
    await dispatch('changeRouterFilterParameters', {})
  },
  async changeRouterFilterParameters(context, query) {
    router.push({[products.routerFiltersSource]: query})
  }
}

export default actions
