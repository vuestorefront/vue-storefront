export default interface ShippingDetails {
  firstName: string,
  lastName: string,
  country: string,
  streetAddress: string,
  apartmentNumber: string,
  city: string,
  state: string,
  region: string,
  region_id: number | string,
  region_code: number | string,
  country_id: string,
  zipCode: string,
  phoneNumber: string,
  shippingMethod: string
}
