import _ from 'lodash'
import i18n from 'lib/i18n'

export default {
  totals (state) {
    if (state.platformTotalSegments) {
      return state.platformTotalSegments
    } else {
      let shipping = state.shipping
      let payment = state.payment
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
          title: i18n.t(payment.name),
          value: payment.costInclTax
        },
        {
          code: 'shipping',
          title: i18n.t(shipping.name),
          value: shipping.costInclTax
        },
        {
          code: 'grand_total',
          title: i18n.t('Grand total'),
          value: _.sumBy(state.cartItems, (p) => {
            return p.qty * p.priceInclTax + shipping.costInclTax + payment.costInclTax
          })
        }
      ]
    }
  },
  totalQuantity (state) {
    return _.sumBy(state.cartItems, (p) => {
      return p.qty
    })
  }
}
