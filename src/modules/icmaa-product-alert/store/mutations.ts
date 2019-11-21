import { MutationTree } from 'vuex'
import ProductAlertState from '../types/ProductAlertState'
import * as types from './mutation-types'
import remove from 'lodash-es/remove'

const mutations: MutationTree<ProductAlertState> = {
  [types.ICMAA_PRODUCT_ALERT_SET_PRODUCTS] (state, productIds: string[]) {
    state.stock = productIds || []
  },
  [types.ICMAA_PRODUCT_ALERT_ADD_PRODUCT] (state, productId) {
    state.stock.push(productId)
  },
  [types.ICMAA_PRODUCT_ALERT_RMV_PRODUCT] (state, productId) {
    state.stock = remove(state.stock, (id) => productId === id)
  },
  [types.ICMAA_PRODUCT_ALERT_CLR_PRODUCT] (state) {
    state.stock = []
  }
}

export default mutations
