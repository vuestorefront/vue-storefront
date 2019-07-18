import { MutationTree } from 'vuex'
import StockState from '../../types/StockState'
import * as types from './mutation-types'

const mutations: MutationTree<StockState> = {
  [types.SET_CACHE] (state, payload) {
    state.cache = payload
  },
  [types.SET_CACHE_PRODUCT] (state, { productId, productInfo }) {
    state.cache[productId] = productInfo
  }
}

export default mutations
