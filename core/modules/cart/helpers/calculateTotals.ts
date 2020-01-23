import i18n from '@vue-storefront/i18n'
import sumBy from 'lodash-es/sumBy'
import map from 'lodash-es/map'
import ShippingMethod from '@vue-storefront/core/modules/cart/types/ShippingMethod'
import PaymentMethod from '@vue-storefront/core/modules/cart/types/PaymentMethod'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'

const calculateTotals = (shippingMethod: ShippingMethod, paymentMethod: PaymentMethod, cartItems: CartItem[]) => {
  const shippingTax = shippingMethod ? sumBy(shippingMethod, (s) => {return s.default_shipping_method.cost}) : 0
  const totalsArray = [
    {
      code: 'subtotal_incl_tax',
      title: i18n.t('Subtotal incl. tax'),
      value: sumBy(cartItems, (p) => p.qty * p.price_incl_tax),
      total:0
    },
    {
      code: 'grand_total',
      title: i18n.t('Grand total'),
      value: sumBy(cartItems, (p) => p.qty * p.price_incl_tax + shippingTax),
      total:0
    }
  ]

  if (paymentMethod) {
    totalsArray.push({
      code: 'payment',
      title: i18n.t(paymentMethod.title),
      value: paymentMethod.cost_incl_tax,
      total:0
    })
  }
  if (shippingMethod) {
    let shipping_methods = map(shippingMethod, (i)=>{return {name: i.default_shipping_method.name, cost: i.default_shipping_method.cost}})
    totalsArray.push({
      code: 'shipping',
      title: i18n.t('Shipping Total Cost'),
      value: shipping_methods,
      total: getShippingCost(shippingMethod,cartItems)
    })
  }

  return totalsArray
}
function getShippingCost(shippingMethod,cartItems) {
  let total=0
  for(let item of cartItems){
    map(shippingMethod, (s) => { if(s.brand_id==item.procc_brand_id)
      total += s.default_shipping_method.cost
    })
  }
return total
}

export default calculateTotals
