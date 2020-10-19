import i18n from '@vue-storefront/i18n'
import sumBy from 'lodash-es/sumBy'
import ShippingMethod from '@vue-storefront/core/modules/cart/types/ShippingMethod'
import PaymentMethod from '@vue-storefront/core/modules/cart/types/PaymentMethod'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'

const calculateTotals = (shippingMethods, shippingMethod: ShippingMethod, paymentMethod: PaymentMethod, cartItems: CartItem[]) => {
  var shippingTax = 0
  var shipping
  if (shippingMethods) {
    for (let i = 0; i < shippingMethods['length']; i++) {
      if (shippingMethods[i].method_code === shippingMethod) {
        shippingTax = shippingMethods[i].amount === 'Free' ? 0 : shippingMethods[i].amount
        shipping = shippingMethods[i]
        break
      }
    }
  }

  const totalsArray = [
    {
      code: 'subtotal_incl_tax',
      title: i18n.t('Subtotal incl. tax'),
      value: sumBy(cartItems, (p) => p.qty * p.price_incl_tax)
    },
    {
      code: 'grand_total',
      title: i18n.t('Grand total'),
      value: sumBy(cartItems, (p) => p.qty * p.price_incl_tax + shippingTax)
    }
  ]

  if (paymentMethod) {
    totalsArray.push({
      code: 'payment',
      title: i18n.t(paymentMethod.title),
      value: paymentMethod.cost_incl_tax
    })
  }
  if (shipping) {
    totalsArray.push({
      code: 'shipping',
      title: i18n.t(shipping.method_title),
      value: shippingTax
    })
  }

  return totalsArray
}

export default calculateTotals
