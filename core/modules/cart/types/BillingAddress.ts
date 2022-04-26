export default interface BillingAddress {
  firstname: string,
  lastname: string,
  city: string,
  postcode: string,
  street: string[],
  countryId: string,
  region?: string,
  telephone?: string
}
