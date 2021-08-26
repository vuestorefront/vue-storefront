import { MutationTree } from 'vuex'
import { Logger } from '@vue-storefront/core/lib/logger'
import * as types from './mutation-types'
import ProductState, { PagedProductList } from '../../types/ProductState'
import Vue from 'vue'

const mutations: MutationTree<ProductState> = {
  [types.PRODUCT_SET_PAGED_PRODUCTS] (state, searchResult) {
    const { start, perPage, total, items } = searchResult
    state.list = {
      start,
      perPage,
      total,
      items
    }
  },
  [types.PRODUCT_ADD_PAGED_PRODUCTS] (state, searchResult) {
    const { start, perPage, items } = searchResult
    state.list = Object.assign(
      {},
      state.list,
      {
        start,
        perPage,
        items: [...(state.list as PagedProductList).items, ...items]
      }
    )
  },
  [types.PRODUCT_SET_RELATED] (state, { key, items }) {
    state.related = Object.assign(
      {},
      state.related,
      { [key]: items }
    )
  },
  [types.PRODUCT_SET_CURRENT] (state, product) {
    state.current = product
  },
  [types.PRODUCT_RESET_CURRENT] (state, originalProduct) {
    state.current = Object.assign({}, originalProduct)
    state.current_configuration = {}
    state.offlineImage = null
    state.parent = null
    state.current_options = { color: [], size: [] }
    state.current_bundle_options = {}
    state.current_custom_options = {}
  },
  [types.PRODUCT_SET_CURRENT_OPTIONS] (state, configuration = {}) {
    state.current_options = configuration
  },
  [types.PRODUCT_SET_CURRENT_CONFIGURATION] (state, configuration = {}) {
    Vue.set(state, 'current_configuration', configuration || {})
  },
  [types.PRODUCT_SET_ORIGINAL] (state, product) {
    state.original = product
  },
  [types.PRODUCT_SET_PARENT] (state, product) {
    state.parent = product
  },
  [types.PRODUCT_SET_CUSTOM_OPTION] (state, { optionId, optionValue }) {
    state.current_custom_options = Object.assign(
      {},
      state.current_custom_options,
      { [optionId]: {
        option_id: optionId,
        option_value: optionValue
      } }
    )
  },
  [types.PRODUCT_SET_BUNDLE_OPTION] (state, { optionId, optionQty, optionSelections }) {
    const option = {
      option_id: optionId,
      option_qty: optionQty,
      option_selections: optionSelections
    }
    state.current_bundle_options = Object.assign(
      {},
      state.current_bundle_options,
      { [optionId]: option }
    )
  },
  [types.PRODUCT_SET_CUSTOM_OPTION_VALIDATOR] (state, { validationRule, validatorFunction }) {
    state.custom_options_validators = Object.assign(
      {},
      state.custom_options_validators,
      { [validationRule]: validatorFunction }
    )
  },
  [types.PRODUCT_SET_GALLERY] (state, productGallery) {
    state.productGallery = productGallery
  },
  [types.CATALOG_SET_BREADCRUMBS] (state, payload) {
    state.breadcrumbs = payload
  },
  [types.CATALOG_ADD_CUSTOM_OPTION_VALIDATOR] (state, { validationRule, validatorFunction }) {
    Logger.error('Deprecated mutation CATALOG_ADD_CUSTOM_OPTION_VALIDATOR - use PRODUCT_SET_CUSTOM_OPTION_VALIDATOR instead')()
  },
  [types.CATALOG_UPD_RELATED] (state, { key, items }) {
    Logger.error('Deprecated mutation CATALOG_UPD_RELATED - use PRODUCT_SET_RELATED instead')()
  },
  [types.CATALOG_UPD_BUNDLE_OPTION] (state, { optionId, optionQty, optionSelections }) {
    Logger.error('Deprecated mutation CATALOG_UPD_BUNDLE_OPTION - use PRODUCT_SET_BUNDLE_OPTION instead')()
  },
  [types.CATALOG_UPD_PRODUCTS] (state, { products, append }) {
    Logger.error('Deprecated mutation CATALOG_UPD_PRODUCTS - use PRODUCT_SET_PAGED_PRODUCTS or PRODUCT_ADD_PAGED_PRODUCTS instead')()
  },
  [types.CATALOG_SET_PRODUCT_CURRENT] (state, product) {
    Logger.error('Deprecated mutation CATALOG_SET_PRODUCT_CURRENT - use PRODUCT_SET_CURRENT instead')()
  },
  [types.CATALOG_SET_PRODUCT_ORIGINAL] (state, product) {
    Logger.error('Deprecated mutation CATALOG_SET_PRODUCT_ORIGINAL - use PRODUCT_SET_ORIGINAL instead')()
  },
  [types.CATALOG_RESET_PRODUCT] (state, productOriginal) {
    Logger.error('Deprecated mutation CATALOG_RESET_PRODUCT - use PRODUCT_RESET_CURRENT instead')()
  },
  [types.CATALOG_UPD_GALLERY] (state, productGallery) {
    Logger.error('Deprecated mutation CATALOG_UPD_GALLERY - use PRODUCT_SET_GALLERY instead')()
  }
}

export default mutations
