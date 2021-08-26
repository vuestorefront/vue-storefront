import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import WishlistState from '../types/WishlistState'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

const actions: ActionTree<WishlistState, RootState> = {
  clear (context) {
    context.commit(types.WISH_DEL_ALL_ITEMS, [])
  },
  async load ({ commit, getters, dispatch }, force: boolean = false) {
    if (!force && getters.isWishlistLoaded) return
    commit(types.SET_WISHLIST_LOADED)
    const storedItems = await dispatch('loadFromCache')
    commit(types.WISH_LOAD_WISH, storedItems)
  },
  loadFromCache () {
    const wishlistStorage = StorageManager.get('wishlist')
    return wishlistStorage.getItem('current-wishlist')
  },
  addItem ({ commit }, product) {
    commit(types.WISH_ADD_ITEM, { product })
  },
  removeItem ({ commit }, product) {
    commit(types.WISH_DEL_ITEM, { product })
  }
}

export default actions
