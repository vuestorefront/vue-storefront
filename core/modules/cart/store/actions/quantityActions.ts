import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { Logger } from '@vue-storefront/core/lib/logger'
import { createDiffLog } from '@vue-storefront/core/modules/cart/helpers'

const quantityActions = {
  async restoreQuantity ({ dispatch }, { product }) {
    const currentCartItem = await dispatch('getItem', { product })
    if (currentCartItem) {
      const prevQty = currentCartItem.prev_qty || product.prev_qty;

      Logger.log('Restoring qty after error' + product.sku + ' ' + prevQty, 'cart', )()
      if (prevQty > 0) {
        await dispatch('updateItem', {
          product: {
            ...product,
            qty: prevQty
          }
        })
        EventBus.$emit('cart-after-itemchanged', { item: currentCartItem })
      } else {
        await dispatch('removeItem', { product: currentCartItem, removeByParentSku: false })
      }
    }
  },
  async updateQuantity ({ commit, dispatch, getters }, { product, qty, forceServerSilence = false }) {
    commit(types.CART_UPD_ITEM, { product, qty })
    if (getters.isCartSyncEnabled && product.server_item_id && !forceServerSilence) {
      return dispatch('sync', { forceClientState: true })
    }

    return createDiffLog()
      .pushClientParty({ status: 'wrong-qty', sku: product.sku, 'client-qty': qty })
  }
}

export default quantityActions
