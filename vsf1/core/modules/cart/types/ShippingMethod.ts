export default interface ShippingMethod {
  method_code?: string,
  carrier_code?: string,
  offline: boolean,
  default: boolean,
  price_incl_tax?: number,
  method_title?: string
}
