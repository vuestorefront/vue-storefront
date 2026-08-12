import { CartService } from '@vue-storefront/core/data-resolver'
import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { IS_CART_SYNCING, IS_COUPON_PROCESSING } from '../getter-types'

const couponActions = {
  async applyPendingCoupon ({ getters, dispatch }) {
    if (getters[IS_CART_SYNCING]) {
      return false
    }

    return dispatch('applyPendingCouponInCartTransaction')
  },
  async applyPendingCouponInCartTransaction ({ getters, commit, dispatch }) {
    const couponCode = getters.getPendingCouponCode

    if (!couponCode || getters.getCoupon || getters[IS_COUPON_PROCESSING]) {
      return false
    }

    try {
      const task = await dispatch('applyCoupon', { couponCode, silent: true })

      if (!task || task.resultCode !== 200) {
        return false
      }

      commit(types.CART_SET_PENDING_COUPON, null)
      return true
    } catch (error) {
      return false
    }
  },
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
  async applyCoupon ({ getters, dispatch, commit }, { couponCode, silent = false }: {couponCode: string, silent: boolean}) {
    if (couponCode && getters.canSyncTotals) {
      commit(types.SET_IS_COUPON_PROCESSING, true);
      try {
        const task = await CartService.applyCoupon(couponCode, silent)

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
