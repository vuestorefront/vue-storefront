export default interface ShippingAddress {
  firstname: string,
  lastname: string,
  city: string,
  postcode: string,
  street: string[],
  region?: string,
  telephone?: string
}
