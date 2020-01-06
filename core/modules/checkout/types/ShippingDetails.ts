export default interface ShippingDetails {
  firstName: string,
  lastName: string,
  country: string,
  streetAddress: string,
  apartmentNumber: string,
  city: string,
  state: string,
  region_id: number | string,
  zipCode: string,
  phoneNumber: string,
  shippingMethod: string
}
