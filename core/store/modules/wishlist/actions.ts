import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from '../../mutation-types'
import EventBus from '../../lib/event-bus'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '../../lib/filters'
import RootState from '../../types/RootState'
import WishlistState from './types/WishlistState'

const actions: ActionTree<WishlistState, RootState> = {
  clear (context) {
    context.commit(types.WISH_LOAD_WISH, [])
  },
  load (context) {
    const commit = context.commit
    Vue.prototype.$db.wishlistCollection.getItem('current-wishlist', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.WISH_LOAD_WISH, storedItems)
    })
  },
  addItem ({ commit }, product) {
    commit(types.WISH_ADD_ITEM, { product })
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
      action1: { label: i18n.t('OK'), action: 'close' }
    })
  },
  removeItem ({ commit }, product) {
    commit(types.WISH_DEL_ITEM, { product })
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.name) }),
      action1: { label: i18n.t('OK'), action: 'close' }
    })
  }
}

export default actions
