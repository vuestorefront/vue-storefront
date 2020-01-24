import OrderShippingDetails from '@vue-storefront/core/modules/cart/types/OrderShippingDetails'
import PaymentMethod from '@vue-storefront/core/modules/cart/types/PaymentMethod'
import ShippingMethod from '@vue-storefront/core/modules/cart/types/ShippingMethod'
import CheckoutData from '@vue-storefront/core/modules/cart/types/CheckoutData'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import find from 'lodash-es/find'

const getDefaultShippingMethod = (shippingMethods: ShippingMethod[] = []): ShippingMethod => {

  let default_shipping_methods=[]
  for(let brand_id in shippingMethods){
    let store_data= shippingMethods[brand_id]
    let shipping_method_data = find(shippingMethods[brand_id]['shipping_methods'], (m)=>{return m._id==store_data['default_shipping_method']})
    default_shipping_methods.push({brand_id, default_shipping_method:shipping_method_data})
  }
  return shippingMethods[0]['shipping_methods'][0]['_id']
}

const getDefaultPaymentMethod = (paymentMethods: PaymentMethod[] = []): PaymentMethod => {
  if (!paymentMethods || !paymentMethods.length) return

  return paymentMethods.find(item => item.default) || paymentMethods[0]
}

const createOrderData = ({
  shippingDetails,
  shippingMethods,
  paymentMethods,
  paymentDetails,
  taxCountry = currentStoreView().tax.defaultCountry,
  selectedShippingMethod
}: CheckoutData): OrderShippingDetails => {
  const country = shippingDetails.country ? shippingDetails.country : taxCountry
  const payment = getDefaultPaymentMethod(paymentMethods)

  return {
    country,
    shippingAddress: {
      firstname: shippingDetails.firstName,
      lastname: shippingDetails.lastName,
      city: shippingDetails.city,
      postcode: shippingDetails.zipCode,
      street: [shippingDetails.streetAddress]
    },
    billingAddress: {
      firstname: paymentDetails.firstName,
      lastname: paymentDetails.lastName,
      city: paymentDetails.city,
      postcode: paymentDetails.zipCode,
      street: [paymentDetails.streetAddress],
      countryId: paymentDetails.country
    },
    selectedShippingMethod:selectedShippingMethod,
    method_code: null,
    carrier_code: null,
    payment_method: payment && payment.code ? payment.code : null
  }
}

export default createOrderData
