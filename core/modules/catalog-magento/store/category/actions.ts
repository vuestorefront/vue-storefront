// import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { buildFilterProductsQuery } from '@vue-storefront/core/helpers'
import config from 'config'
import trim from 'lodash-es/trim'
import toString from 'lodash-es/toString'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { optionLabel } from '../../helpers/optionLabel'
import { router } from '@vue-storefront/core/app'
import FilterVariant from '../../types/FilterVariant';

const actions: ActionTree<CategoryState, RootState> = {
  /**
   * Initialise category module.
   * - gets available categories
   * - gets available filters for current category
   */
  async initCategoryModule ({ getters, dispatch }) {
    if (!getters.getCategories.length) {
      await dispatch('getCategories')
      await dispatch('getAvailableFilters')
    }
  },
  async searchProducts ({ commit, getters, dispatch }, { filters, route } = {}) {
    await dispatch('initCategoryModule')
    const searchQuery = getters.getCurrentFiltersFrom(filters)
    const searchCategory = getters.getCurrentCategoryFrom(route)
    let filterQr = buildFilterProductsQuery(searchCategory, searchQuery.filters)
    const searchResult = await quickSearchByQuery({ query: filterQr, sort: searchQuery.sort })
    commit(types.CATEGORY_SET_PRODUCTS, searchResult.items)

    return searchResult.items
  },
  async fetchCategories ({ dispatch }) {
    const res = await dispatch('category/list', {}, {root: true})
    return res.items
  },
  async getCategories ({ commit, dispatch }) {
    const categories = await dispatch('fetchCategories')
    commit(types.CATEGORY_SET_CATEGORIES, categories)
    return categories
  },
  /**
   * Fetch and process filters from current category and sets them in available filters.
   */
  async getAvailableFilters ({ commit, getters, rootState }) {
    const filters = {}
    const searchCategory = getters.getCurrentCategory
    let filterQr = buildFilterProductsQuery(searchCategory)
    const searchResult = await quickSearchByQuery({ query: filterQr })
    if (searchResult && searchResult.aggregations) { // populate filter aggregates
      for (let attrToFilter of config.products.defaultFilters) { // fill out the filter options
        let filterOptions:Array<FilterVariant> = []

        let uniqueFilterValues = new Set<string>()
        if (attrToFilter !== 'price') {
          if (searchResult.aggregations['agg_terms_' + attrToFilter]) {
            let buckets = searchResult.aggregations['agg_terms_' + attrToFilter].buckets
            if (searchResult.aggregations['agg_terms_' + attrToFilter + '_options']) {
              buckets = buckets.concat(searchResult.aggregations['agg_terms_' + attrToFilter + '_options'].buckets)
            }

            for (let option of buckets) {
              uniqueFilterValues.add(toString(option.key))
            }
          }

          uniqueFilterValues.forEach(key => {
            const label = optionLabel(rootState.attribute, { attributeKey: attrToFilter, optionId: key })
            if (trim(label) !== '') { // is there any situation when label could be empty and we should still support it?
              filterOptions.push({
                id: key,
                label: label,
                type: attrToFilter
              })
            }
          });
        } else { // special case is range filter for prices
          const storeView = currentStoreView()
          const currencySign = storeView.i18n.currencySign
          if (searchResult.aggregations['agg_range_' + attrToFilter]) {
            let index = 0
            let count = searchResult.aggregations['agg_range_' + attrToFilter].buckets.length
            for (let option of searchResult.aggregations['agg_range_' + attrToFilter].buckets) {
              filterOptions.push({
                id: option.key,
                type: attrToFilter,
                from: option.from,
                to: option.to,
                label: (index === 0 || (index === count - 1)) ? (option.to ? '< ' + currencySign + option.to : '> ' + currencySign + option.from) : currencySign + option.from + (option.to ? ' - ' + option.to : '')// TODO: add better way for formatting, extract currency sign
              })
              index++
            }
          }
        }
        filters[attrToFilter] = filterOptions
      }
      // Add sort to available filters
      let variants = []
      Object.keys(config.products.sortByAttributes).map(label => {
        variants.push({
          label: label,
          id: config.products.sortByAttributes[label],
          type: 'sort'
        })
      })
      filters['sort'] = variants
    }
    commit(types.CATEGORY_SET_AVAILABLE_FILTERS, filters)
  },
  async switchSearchFilter({ dispatch }, filterVariant:FilterVariant) {
    // TODO: not duplicate system filters like sort
    const currentQuery = JSON.parse(JSON.stringify(router.currentRoute.query))
    let queryFilter = currentQuery[filterVariant.type] || []
    if (!Array.isArray(queryFilter)) queryFilter = [queryFilter]
    if(queryFilter.includes(filterVariant.id)) {
      queryFilter = queryFilter.filter(value => value !== filterVariant.id)
    } else {
      queryFilter.push(filterVariant.id)
    }
    currentQuery[filterVariant.type] = queryFilter
    router.push({query: currentQuery})
  },
  async resetFilters() {
    router.push({query: {}})
  }
}

export default actions
