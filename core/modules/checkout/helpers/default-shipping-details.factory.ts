export default function getDefaultShippingDetails () {
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
    vat_id: ''
    // TODO: uncomment after API support this field
    // is_suggested: false
  }
}
