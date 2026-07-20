export default interface AddressValidationDetails {
  streetAddress: string | undefined,
  apartmentNumber: string | undefined,
  city: string | undefined,
  state: string | undefined,
  region_id: number | null | undefined,
  zipCode: string | undefined,
  country: string | undefined
}
