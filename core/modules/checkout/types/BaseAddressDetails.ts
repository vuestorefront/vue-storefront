export default interface BaseAddressDetails {
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
  vat_id: string
  // TODO: uncomment after API support this field
  // is_suggested: boolean
}
