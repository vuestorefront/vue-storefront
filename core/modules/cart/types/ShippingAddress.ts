export default interface ShippingAddress {
  firstname: string,
  lastname: string,
  city: string,
  postcode: string,
  street: string[],
  region: string,
  region_id: number | string,
  region_code: number | string,
  country_id: string
}
