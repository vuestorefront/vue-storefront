import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import RecentlyViewedState from '../types/RecentlyViewedState'

const mutations: MutationTree<RecentlyViewedState> = {
  /**
  * Add product to Recently Viewed Products
  * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
  */
  [types.RECENTLY_VIEWED_ADD_ITEM] (state, { product }) {
    const record = state.items.find(p => p.sku === product.sku)
    if (!record) {
      state.items.unshift(product)
    }
  },
  [types.RECENTLY_VIEWED_LOAD] (state, storedItems) {
    state.items = storedItems || []
  }
}

export default mutations
