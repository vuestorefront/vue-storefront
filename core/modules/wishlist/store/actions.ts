import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/store/lib/filters'
import rootStore from '@vue-storefront/core/store'
import RootState from '@vue-storefront/core/types/RootState'
import WishlistState from '../types/WishlistState'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<WishlistState, RootState> = {
  clear (context) {
    context.commit(types.WISH_LOAD_WISH, [])
  },
  load ({ commit, getters }, force: boolean = false) {
    if (!force && getters.isWishlistLoaded) return
    commit(types.SET_WISHLIST_LOADED)
    cacheStorage.getItem('current-wishlist', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.WISH_LOAD_WISH, storedItems)
      Logger.info('Wishlist state loaded from browser cache. ', 'cache', storedItems)()
    })
  },
  addItem ({ commit }, product) {
    commit(types.WISH_ADD_ITEM, { product })
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
      action1: { label: i18n.t('OK') }
    })
  },
  removeItem ({ commit }, product) {
    commit(types.WISH_DEL_ITEM, { product })
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.name) }),
      action1: { label: i18n.t('OK') }
    })
  }
}

export default actions
