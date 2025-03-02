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
}
