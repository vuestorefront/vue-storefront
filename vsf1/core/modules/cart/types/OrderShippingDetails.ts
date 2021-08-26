import ShippingAddress from './ShippingAddress'
import BillingAddress from './BillingAddress'

export default interface OrderShippingDetails {
  country?: string,
  method_code?: string,
  carrier_code?: string,
  payment_method?: string,
  shippingAddress?: ShippingAddress,
  billingAddress?: BillingAddress
}
