import BaseAddressDetails from './BaseAddressDetails';

export default interface ShippingDetails extends BaseAddressDetails {
  shippingMethod: string,
  shippingCarrier: string
}
