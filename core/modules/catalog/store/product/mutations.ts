import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import ProductState, { PagedProductList } from '../../types/ProductState'

const mutations: MutationTree<ProductState> = {
  [types.CATALOG_SET_BREADCRUMBS] (state, payload) {
    state.breadcrumbs = payload
  },
  [types.CATALOG_UPD_RELATED] (state, { key, items }) {
    state.related[key] = items
    Vue.prototype.$bus.$emit('product-after-related', { key: key, items: items })
  },
  [types.CATALOG_ADD_CUSTOM_OPTION_VALIDATOR] (state, { validationRule, validatorFunction }) {
    state.custom_options_validators[validationRule] = validatorFunction
  },
  [types.CATALOG_UPD_CUSTOM_OPTION] (state, { optionId, optionValue }) {
    state.current_custom_options[optionId] = {
      option_id: optionId,
      option_value: optionValue
    }
  },
  [types.CATALOG_UPD_BUNDLE_OPTION] (state, { optionId, optionQty, optionSelections }) {
    state.current_bundle_options[optionId] = {
      option_id: optionId,
      option_qty: optionQty,
      option_selections: optionSelections
    }
  },
  [types.CATALOG_UPD_PRODUCTS] (state, { products, append }) {
    if (append === false) {
      state.list = products
    } else {
      (state.list as PagedProductList).start = products.start as number
      (state.list as PagedProductList).perPage = products.perPage as number
      (state.list as PagedProductList).items = (state.list as PagedProductList).items.concat(products.items)
    }
  },
  [types.CATALOG_SET_PRODUCT_CURRENT] (state, product) {
    state.current = product
  },
  [types.CATALOG_SET_PRODUCT_ORIGINAL] (state, product) {
    state.original = product
    Vue.prototype.$bus.$emit('product-after-original', { original: product })
  },
  [types.CATALOG_SET_PRODUCT_PARENT] (state, product) {
    state.parent = product
    Vue.prototype.$bus.$emit('product-after-parent', { parent: product })
  },
  [types.CATALOG_RESET_PRODUCT] (state, productOriginal) {
    state.current = productOriginal || {}
    state.current_configuration = {}
    state.offlineImage = null
    state.parent = null
    state.current_options = {color: [], size: []}
    state.current_bundle_options = {}
    state.current_custom_options = {}
    Vue.prototype.$bus.$emit('product-after-reset', { })
  },
  [types.CATALOG_UPD_GALLERY] (state, productGallery) {
    state.productGallery = productGallery
  }
}

export default mutations
