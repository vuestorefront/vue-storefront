import { CartService } from '@vue-storefront/core/data-resolver'

const couponActions = {
  async removeCoupon ({ getters, dispatch }, { sync = true }) {
    if (getters.canSyncTotals) {
      const { result } = await CartService.removeCoupon()

      if (result && sync) {
        await dispatch('syncTotals', { forceServerSync: true })
        return result
      }
    }
  },
  async applyCoupon ({ getters, dispatch }, couponCode) {
    if (couponCode && getters.canSyncTotals) {
      const { result } = await CartService.applyCoupon(couponCode)

      if (result) {
        await dispatch('syncTotals', { forceServerSync: true })
      }
      return result
    }
  }
}

export default couponActions
