import _ from 'lodash'
import i18n from 'core/lib/i18n'

export default {
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
            value: _.sumBy(state.cartItems, (p) => {
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
            value: _.sumBy(state.cartItems, (p) => {
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
    return _.sumBy(state.cartItems, (p) => {
      return p.qty
    })
  },
  shippingMethods (state) {
    if (state.shipping instanceof Array) {
      return state.shipping
    } else {
      return [state.shipping]
    }
  },
  paymentMethods (state) {
    if (state.payment instanceof Array) {
      return state.payment
    } else {
      return [state.payment]
    }
  }
}
