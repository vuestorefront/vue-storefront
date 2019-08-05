export default interface ShippingMethod {
  method_code?: string,
  carrier_code?: string,
  offline: boolean,
  default: boolean
}
