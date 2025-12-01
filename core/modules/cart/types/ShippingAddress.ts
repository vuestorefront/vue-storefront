export default interface ShippingAddress {
  firstname: string,
  lastname: string,
  city: string,
  postcode: string,
  street: string[],
  region?: string,
  region_id: number | null,
  telephone?: string,
  vat_id?: string
  // TODO: uncomment after API support this field
  // is_suggested?: boolean
}
