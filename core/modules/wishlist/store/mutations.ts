import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import WishlistState from '../types/WishlistState'

const mutations: MutationTree<WishlistState> = {
  /**
  * Add product to Wishlist
  * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
  */
  [types.WISH_ADD_ITEM] (state, { product }) {
    const record = state.items.find(p => p.sku === product.sku)
    if (!record) {
      state.items.push({
        ...product,
        qty: 1
      })
    }
  },
  [types.WISH_DEL_ITEM] (state, { product }) {
    state.items = state.items.filter(p => p.sku !== product.sku)
  },
  [types.WISH_LOAD_WISH] (state, storedItems) {
    state.items = storedItems || []
  },
  [types.SET_WISHLIST_LOADED] (state, isLoaded: boolean = true) {
    state.loaded = isLoaded
  }
}

export default mutations
