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
import { products } from 'config'
import { configureProductAsync } from '@vue-storefront/core/modules/catalog/helpers'
import { DataResolver } from 'core/data-resolver/types/DataResolver';
import { Category } from '../../types/Category';
import { _prepareCategoryMaps } from '../../helpers/categoryHelpers';

const actions: ActionTree<CategoryState, RootState> = {
  async loadCategoryProducts ({ commit, getters, dispatch, rootState }, { route, category } = {}) {
    const searchCategory = category || getters.getCategoryFrom(route.path)
    await dispatch('loadCategoryFilters', searchCategory)
    const searchQuery = getters.getCurrentFiltersFrom(route[products.routerFiltersSource])
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)
    const searchResult = await quickSearchByQuery({ query: filterQr, sort: searchQuery.sort })
    let configuredProducts = searchResult.items.map(product => {
      const configuredProductVariant = configureProductAsync({rootState, state: {current_configuration: {}}}, {product, configuration: searchQuery.filters, selectDefaultVariant: false, fallbackToDefaultWhenNoAvailable: true, setProductErorrs: false})
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
    return CategoryService.getCategories()
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
  async resetFilters ({dispatch}) {
    await dispatch('changeRouterFilterParameters', {})
  },
  async changeRouterFilterParameters (context, query) {
    router.push({[products.routerFiltersSource]: query})
  },
  async loadCategoryBreadcrumbs ({ dispatch, getters }, category: Category) {
    const categoryHierarchy = getters.getCategoriesHierarchyIdsMap.find(categoryMapping => categoryMapping.includes(category.id))
    const categoryFilters = { 'id': categoryHierarchy }
    await dispatch('loadCategories', {filters: categoryFilters})
  },
  /**
   * [INTERNAL USE]
   * Loads firstLevel category and creates map of categories hierarchy ids.
   * This is an internalMethod invoked after module registration.
   */
  async _prepareCategoriesMap ({ dispatch, commit }) {
    const categoryFilters = { 'level': 1 }
    const parentCategory = await dispatch('loadCategory', {filters: categoryFilters})
    if (parentCategory) {
      const categoryBreadcrumbsMap = _prepareCategoryMaps(parentCategory)
      commit(types.CATEGORY_SET_HIERARCHY_MAP, categoryBreadcrumbsMap)
    }
  }
}

export default actions
