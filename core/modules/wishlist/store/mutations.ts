import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import WishlistState from '../types/WishlistState'

const mutations: MutationTree<WishlistState> = {
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
  [types.WISH_LOAD_WISH] (state, storedItems = []) {
    state.items = storedItems || []
  },
  [types.WISH_DEL_ALL_ITEMS] (state) {
    state.items = []
  },
  [types.SET_WISHLIST_LOADED] (state, isLoaded: boolean = true) {
    state.loaded = isLoaded
  }
}

export default mutations
