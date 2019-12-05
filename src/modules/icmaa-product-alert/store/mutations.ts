import Vue from 'vue'
import { MutationTree } from 'vuex'
import ProductAlert from '../types/ProductAlertState'
import Product from '@vue-storefront/core/modules/catalog/types/Product'
import * as types from './mutation-types'

const mutations: MutationTree<ProductAlert> = {
  [types.ICMAA_PRODUCT_ALERT_SET_STOCK] (state, productIds: string[]) {
    state.stock = productIds || []
  },
  [types.ICMAA_PRODUCT_ALERT_ADD_STOCK] (state, productId) {
    state.stock.push(productId)
  },
  [types.ICMAA_PRODUCT_ALERT_RMV_STOCK] (state, productId) {
    Vue.delete(state.stock, state.stock.findIndex(id => id === productId))
  },
  [types.ICMAA_PRODUCT_ALERT_CLR_STOCK] (state) {
    state.stock = []
  },
  [types.ICMAA_PRODUCT_ALERT_SET_PRODUCTS_DATA] (state, payload: Product[]) {
    state.product = payload
  },
  [types.ICMAA_PRODUCT_ALERT_RMV_PRODUCTS_DATA] (state, productId: string) {
    Vue.delete(state.product, state.product.findIndex(p => p.id === productId))
  }
}

export default mutations
