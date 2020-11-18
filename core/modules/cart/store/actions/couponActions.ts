import { CartService } from '@vue-storefront/core/data-resolver'
import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'

const couponActions = {
  async removeCoupon ({ getters, dispatch, commit }, { sync = true } = {}) {
    if (getters.canSyncTotals) {
      const { result } = await CartService.removeCoupon()

      if (result && sync) {
        await dispatch('syncTotals', { forceServerSync: true })

        // 'getCurrentCartHash' has been changed (it's based on cart items data)
        // so we need to update it in vuex and StorageManager
        commit(types.CART_SET_ITEMS_HASH, getters.getCurrentCartHash)
        return result
      }
    }
  },
  async applyCoupon ({ getters, dispatch, commit }, couponCode) {
    if (couponCode && getters.canSyncTotals) {
      const { result } = await CartService.applyCoupon(couponCode)

      if (result) {
        await dispatch('syncTotals', { forceServerSync: true })

        // 'getCurrentCartHash' has been changed (it's based on cart items data)
        // so we need to update it in vuex and StorageManager
        commit(types.CART_SET_ITEMS_HASH, getters.getCurrentCartHash)
      }
      return result
    }
  }
}

export default couponActions
