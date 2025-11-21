export default interface BillingAddress {
  firstname: string,
  lastname: string,
  city: string,
  postcode: string,
  street: string[],
  countryId: string,
  region?: string,
  region_id: number | null,
  telephone?: string,
  vat_id?: string,
  is_suggested?: boolean
}
