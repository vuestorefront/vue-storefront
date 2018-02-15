import _ from 'lodash'

export default {
  totals (state) {
    return {
      subtotal: _.sumBy(state.cartItems, (p) => {
        return p.qty * p.price
      }),
      subtotalInclTax: _.sumBy(state.cartItems, (p) => {
        return p.qty * p.priceInclTax
      }),
      subtotalTax: _.sumBy(state.cartItems, (p) => {
        return p.qty * p.tax
      }),
      quantity: _.sumBy(state.cartItems, (p) => {
        return p.qty
      })
    }
  }
}
