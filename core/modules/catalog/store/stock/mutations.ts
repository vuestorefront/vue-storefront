import { MutationTree } from 'vuex'
import StockState from '../../types/StockState'
import * as types from './mutation-types'

const mutations: MutationTree<StockState> = {
  [types.SET_STOCK_CACHE] (state, cache) {
    state.cache = cache
  },
  [types.SET_STOCK_CACHE_PRODUCT] (state, { productId, productInfo }) {
    state.cache = Object.assign({}, state.cache, {
      [productId]: productInfo
    })
  }
}

export default mutations
