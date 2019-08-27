import ShippingDetails from '@vue-storefront/core/modules/checkout/types/ShippingDetails'
import ShippingMethod from './ShippingMethod'
import PaymentMethod from './PaymentMethod'

export default interface CheckoutData {
  shippingDetails: ShippingDetails,
  shippingMethods: ShippingMethod[],
  paymentMethods: PaymentMethod[],
  taxCountry?: string
}
