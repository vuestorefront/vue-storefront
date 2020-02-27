import OrderShippingDetails from '@vue-storefront/core/modules/cart/types/OrderShippingDetails'
import PaymentMethod from '@vue-storefront/core/modules/cart/types/PaymentMethod'
import ShippingMethod from '@vue-storefront/core/modules/cart/types/ShippingMethod'
import CheckoutData from '@vue-storefront/core/modules/cart/types/CheckoutData'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

const getDefaultShippingMethod = (shippingMethods: ShippingMethod[] = []): ShippingMethod => {
  const onlineShippingMethods = shippingMethods.filter(shippingMethod => !shippingMethod.offline)
  if (!onlineShippingMethods.length) return

  return onlineShippingMethods.find(shippingMethod => !!shippingMethod.default) || onlineShippingMethods[0]
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
  taxCountry = currentStoreView().tax.defaultCountry
}: CheckoutData): OrderShippingDetails => {
  const country = shippingDetails.country ? shippingDetails.country : taxCountry
  const shipping = getDefaultShippingMethod(shippingMethods)
  const payment = getDefaultPaymentMethod(paymentMethods)

  return {
    country,
    shippingAddress: {
      firstname: shippingDetails.firstName,
      lastname: shippingDetails.lastName,
      city: shippingDetails.city,
      postcode: shippingDetails.zipCode,
      street: [shippingDetails.streetAddress],
      region: shippingDetails.region,
      region_id: shippingDetails.region_id,
      region_code: shippingDetails.region_code,
      country_id: shippingDetails.country
    },
    billingAddress: {
      firstname: paymentDetails.firstName,
      lastname: paymentDetails.lastName,
      city: paymentDetails.city,
      postcode: paymentDetails.zipCode,
      street: [paymentDetails.streetAddress],
      region: paymentDetails.region,
      region_id: paymentDetails.region_id,
      region_code: paymentDetails.region_code,
      country_id: paymentDetails.country
    },
    method_code: shipping && shipping.method_code ? shipping.method_code : null,
    carrier_code: shipping && shipping.carrier_code ? shipping.carrier_code : null,
    payment_method: payment && payment.code ? payment.code : null
  }
}

export default createOrderData
