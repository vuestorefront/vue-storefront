import OrderShippingDetails from '@vue-storefront/core/modules/cart/types/OrderShippingDetails'
import PaymentMethod from '@vue-storefront/core/modules/cart/types/PaymentMethod'
import ShippingMethod from '@vue-storefront/core/modules/cart/types/ShippingMethod'
import CheckoutData from '@vue-storefront/core/modules/cart/types/CheckoutData'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import ShippingAddress from '../types/ShippingAddress'

const getDefaultShippingMethod = (shippingMethods: ShippingMethod[] = []): ShippingMethod | undefined => {
  const onlineShippingMethods = shippingMethods.filter(shippingMethod => !shippingMethod.offline)
  if (!onlineShippingMethods.length) return

  return onlineShippingMethods.find(shippingMethod => !!shippingMethod.default) || onlineShippingMethods[0]
}

const getDefaultPaymentMethod = (paymentMethods: PaymentMethod[] = []): PaymentMethod | undefined => {
  if (!paymentMethods || !paymentMethods.length) return

  return paymentMethods.find(item => item.default) || paymentMethods[0]
}

export const createShippingAddressData = (
  shippingDetails: CheckoutData['shippingDetails']
): ShippingAddress => {
  return {
    firstname: shippingDetails.firstName,
    lastname: shippingDetails.lastName,
    city: shippingDetails.city,
    postcode: shippingDetails.zipCode,
    street: [shippingDetails.streetAddress, shippingDetails.apartmentNumber],
    region: shippingDetails.state ? shippingDetails.state : undefined,
    region_id: shippingDetails.region_id,
    telephone: shippingDetails.phoneNumber,
    vat_id: shippingDetails.vat_id
    // TODO: uncomment after API support this field
    // is_suggested: shippingDetails.is_suggested || false
  }
};

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

  let shippingMethodCode = shippingDetails.shippingMethod || shipping?.method_code;
  // TODO: update type properly
  let shippingCarrierCode: string | undefined = (shippingDetails as any).shippingCarrier || shipping?.carrier_code;
  let paymentMethodCode = paymentDetails.paymentMethod || payment?.code;

  return {
    country,
    shippingAddress: createShippingAddressData(shippingDetails),
    billingAddress: {
      firstname: paymentDetails.firstName,
      lastname: paymentDetails.lastName,
      city: paymentDetails.city,
      postcode: paymentDetails.zipCode,
      street: [paymentDetails.streetAddress, paymentDetails.apartmentNumber],
      countryId: paymentDetails.country,
      region: paymentDetails.state ? paymentDetails.state : undefined,
      region_id: paymentDetails.region_id,
      telephone: paymentDetails.phoneNumber,
      vat_id: paymentDetails.vat_id
      // TODO: uncomment after API support this field
      // is_suggested: paymentDetails.is_suggested || false
    },
    method_code: shippingMethodCode,
    carrier_code: shippingCarrierCode,
    payment_method: paymentMethodCode
  }
}

export default createOrderData
