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
  async searchProducts ({ commit, dispatch, rootState }, { category } = {}) {
    await dispatch('initCategoryModule')
    console.error('QUERIES', rootState.route.query)
    // const category = await store.dispatch('category/single', { key: store.state.config.products.useMagentoUrlKeys ? 'url_key' : 'slug', value: route.params.slug })
    const searchCategory = category ? category : await dispatch('getCurrentCategory')
    let filterQr = buildFilterProductsQuery(searchCategory)
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
  async getAvailableFilters ({ commit, dispatch, rootState }) {
    const filters = {}
    const searchCategory = await dispatch('getCurrentCategory')
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
  }
}

export default actions
