import { AddressExtensionAttributes } from 'core/modules/checkout';

export default interface ShippingAddress {
  firstname: string,
  lastname: string,
  city: string,
  postcode: string,
  street: string[],
  region?: string,
  region_id: number | null,
  telephone?: string,
  vat_id?: string,
  extension_attributes?: AddressExtensionAttributes
}
