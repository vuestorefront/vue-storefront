import { GetterTree } from 'vuex'
import sumBy from 'lodash-es/sumBy'
import i18n from '@vue-storefront/i18n'
import CartState from '../types/CartState'
import RootState from '@vue-storefront/store/types/RootState'
import AppliedCoupon from '../types/AppliedCoupon'

const getters: GetterTree<CartState, RootState> = {
  totals (state) {
    if (state.platformTotalSegments) {
      return state.platformTotalSegments
    } else {
      let shipping = state.shipping instanceof Array ? state.shipping[0] : state.shipping
      let payment = state.payment instanceof Array ? state.payment[0] : state.payment
      if (shipping && payment) {
        return [
          {
            code: 'subtotalInclTax',
            title: i18n.t('Subtotal incl. tax'),
            value: sumBy(state.cartItems, (p) => {
              return p.qty * p.priceInclTax
            })
          },
          {
            code: 'payment',
            title: i18n.t(payment.title),
            value: payment.costInclTax
          },
          {
            code: 'shipping',
            title: i18n.t(shipping.method_title),
            value: shipping.price_incl_tax
          },
          {
            code: 'grand_total',
            title: i18n.t('Grand total'),
            value: sumBy(state.cartItems, (p) => {
              return p.qty * p.priceInclTax + shipping.price_incl_tax
            })
          }
        ]
      } else {
        return []
      }
    }
  },
  totalQuantity (state) {
    return sumBy(state.cartItems, (p) => {
      return p.qty
    })
  },
  coupon (state) : AppliedCoupon | false {
    if (!(state.platformTotals && state.platformTotals.hasOwnProperty('coupon_code'))) {
      return false
    }
    return {
      code: state.platformTotals.coupon_code,
      discount: state.platformTotals.discount_amount
    }
  }
}

export default getters