export default interface ShippingDetails {
  firstName: string,
  lastName: string,
  country: string,
  streetAddress: string,
  apartmentNumber: string,
  city: string,
  state: string,
  region_id: number | null,
  zipCode: string,
  phoneNumber: string,
  shippingMethod: string,
  vat_id: string
}
