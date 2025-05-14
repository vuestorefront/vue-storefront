import { CartService } from '@vue-storefront/core/data-resolver'
import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'

const couponActions = {
  async removeCoupon ({ commit, getters, dispatch }, { sync = true } = {}) {
    if (getters.canSyncTotals) {
      commit(types.SET_IS_COUPON_PROCESSING, true);
      try {
        const { result } = await CartService.removeCoupon()

        if (result && sync) {
          await dispatch('syncTotals', { forceServerSync: true })

          // 'getCurrentCartHash' has been changed (it's based on cart items data)
          // so we need to update it in vuex and StorageManager
          commit(types.CART_SET_ITEMS_HASH, getters.getCurrentCartHash)
          return result
        }
      } finally {
        commit(types.SET_IS_COUPON_PROCESSING, false);
      }
    }
  },
  async applyCoupon ({ getters, dispatch, commit }, couponCode) {
    if (couponCode && getters.canSyncTotals) {
      commit(types.SET_IS_COUPON_PROCESSING, true);
      try {
        const task = await CartService.applyCoupon(couponCode)

        if (task.result) {
          await dispatch('syncTotals', { forceServerSync: true })

          // 'getCurrentCartHash' has been changed (it's based on cart items data)
          // so we need to update it in vuex and StorageManager
          commit(types.CART_SET_ITEMS_HASH, getters.getCurrentCartHash)
        }

        return task;
      } finally {
        commit(types.SET_IS_COUPON_PROCESSING, false);
      }
    }
  }
}

export default couponActions
