import { GetterTree } from 'vuex'
import sumBy from 'lodash-es/sumBy'
import i18n from '@vue-storefront/i18n'
import CartState from '../types/CartState'
import RootState from '@vue-storefront/core/types/RootState'
import AppliedCoupon from '../types/AppliedCoupon'

const getters: GetterTree<CartState, RootState> = {
  totals (state) {
    if (state.platformTotalSegments) {
      return state.platformTotalSegments
    } else {
      let shipping = state.shipping instanceof Array ? state.shipping[0] : state.shipping
      let payment = state.payment instanceof Array ? state.payment[0] : state.payment
      const totalsArray = [
          {
            code: 'subtotalInclTax',
            title: i18n.t('Subtotal incl. tax'),
            value: sumBy(state.cartItems, (p) => {
              return p.qty * p.priceInclTax
            })
          },
          {
            code: 'grand_total',
            title: i18n.t('Grand total'),
            value: sumBy(state.cartItems, (p) => {
              return p.qty * p.priceInclTax + (shipping ? shipping.price_incl_tax : 0)
            })
          }
        ]
      if (payment) {
        totalsArray.push({
          code: 'payment',
          title: i18n.t(payment.title),
          value: payment.costInclTax
        })
      }
      if (shipping) {
        totalsArray.push({
          code: 'shipping',
          title: i18n.t(shipping.method_title),
          value: shipping.price_incl_tax
        })
      }
      return totalsArray
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
  },
  isVirtualCart (state) {
    return state.cartItems.every((itm) => {
      return itm.type_id === 'downloadable' || itm.type_id === 'virtual' // check for downloadable & virtual products
    })
  }
}

export default getters