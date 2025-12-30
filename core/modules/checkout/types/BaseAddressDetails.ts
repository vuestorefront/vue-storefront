import { AddressExtensionAttributes } from '@vue-storefront/core/modules/shared';

export default interface BaseAddressDetails {
  firstName: string,
  lastName: string,
  country: string,
  streetAddress: string,
  apartmentNumber: string,
  city: string,
  state: string,
  region_id: number | null,
  zipCode: string,
  phoneNumber: string,
  vat_id: string,
  extension_attributes?: AddressExtensionAttributes
}
