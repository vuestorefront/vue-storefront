import ShippingDetails from '../types/ShippingDetails';

export default function getDefaultShippingDetails (): ShippingDetails {
  return {
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    apartmentNumber: '',
    city: '',
    state: '',
    region_id: null,
    zipCode: '',
    phoneNumber: '',
    shippingMethod: '',
    shippingCarrier: '',
    vat_id: ''
  }
}
