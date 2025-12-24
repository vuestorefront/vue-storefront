export interface OrderAddress {
  address_type: 'shipping' | 'billing',
  city: string,
  country_id: string,
  email: string,
  entity_id: number,
  firstname: string,
  lastname: string,
  parent_id: number,
  postcode: string,
  region?: string,
  region_code: string,
  region_id: number | null,
  street: string[],
  telephone?: string,
  vat_id?: string
}
