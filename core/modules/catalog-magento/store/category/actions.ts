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
  async getCurrentFilters ({ getters, rootState }, filters) {
    const currentQuery = filters ? filters : rootState.route.query
    const chosenFilter = {}
    Object.keys(currentQuery).map(filterKey => {
      const filter = getters.getAvailableFilters[filterKey]
      const queryValue = currentQuery[filterKey]
      if (Array.isArray(queryValue)) {
        queryValue.map(singleValue => {
          const variant = filter.find(filterVariant => filterVariant.id === singleValue)
          if (!chosenFilter[filterKey] || !Array.isArray(chosenFilter[filterKey])) chosenFilter[filterKey] = []
          chosenFilter[filterKey].push({...variant, attribute_code: filterKey})
        })
      } else {
        const variant = filter.find(filterVariant => filterVariant.id === queryValue)
        chosenFilter[filterKey] = {...variant, attribute_code: filterKey}
      }
    })
    return chosenFilter
  },
  async searchProducts ({ commit, getters, dispatch }, { category, filters } = {}) {
    await dispatch('initCategoryModule')
    console.error("SEARCH IN: " + router.currentRoute.fullPath)
    // const category = await store.dispatch('category/single', { key: store.state.config.products.useMagentoUrlKeys ? 'url_key' : 'slug', value: route.params.slug })
    const currentFilters = await dispatch('getCurrentFilters', filters)
    const searchCategory = category ? category : getters.getCurrentCategory // await dispatch('getCurrentCategory')
    let filterQr = buildFilterProductsQuery(searchCategory, currentFilters)
    const searchResult = await quickSearchByQuery({ query: filterQr })
    commit(types.CATEGORY_SET_PRODUCTS, searchResult.items)

    return searchResult.items
  },
  async getCurrentCategory ({ dispatch, rootState }) {
    return await dispatch('category/single', { key: config.products.useMagentoUrlKeys ? 'url_key' : 'slug', value: rootState.route.params.slug }, {root: true})
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
        let filterOptions = []

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
                label: label
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
    }
    commit(types.CATEGORY_SET_AVAILABLE_FILTERS, filters)
  },
  async switchSearchFilter({ dispatch }, filterVariant) {
    const query = Object.assign({}, router.currentRoute.query) // await dispatch('getCurrentFilters')
    if(query[filterVariant.name] && query[filterVariant.name] === filterVariant.value.id) {
      delete query[filterVariant.name]
    } else {
      query[filterVariant.name] = filterVariant.value.id
    }
    router.push({query})
  },
  async resetFilters() {
    router.push({query: {}})
  }
}

export default actions
