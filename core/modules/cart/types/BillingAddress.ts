import { AddressExtensionAttributes } from '@vue-storefront/core/modules/shared';

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
  extension_attributes?: AddressExtensionAttributes
}
