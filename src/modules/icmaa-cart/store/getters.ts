import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CartState from '../types/CartState'
import AppliedCoupon from '@vue-storefront/core/modules/cart/types/AppliedCoupon'

const getters: GetterTree<CartState, RootState> = {
  getCoupon: ({ platformTotals }): AppliedCoupon | false => {
    if (!platformTotals) {
      return false
    }

    if (platformTotals.hasOwnProperty('coupon_code') && platformTotals.coupon_code !== null) {
      return { code: platformTotals.coupon_code, discount: platformTotals.discount_amount }
    }

    const giftcert = platformTotals.total_segments.find(s => s.code === 'ugiftcert')
    if (giftcert) {
      return { code: giftcert.giftcert_code, discount: giftcert.base_balances * -1 }
    }
  },
  getFreeCartItems: (state): string[] => state.freeCartItems
}

export default getters
