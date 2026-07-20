import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import AddressValidationDetails from '../types/address-validation-details.interface';

export function toAddressValidationDetails (
  address: Partial<BaseAddressDetails> = {}
): AddressValidationDetails {
  return {
    streetAddress: address.streetAddress,
    apartmentNumber: address.apartmentNumber,
    city: address.city,
    state: address.state,
    region_id: address.region_id,
    zipCode: address.zipCode,
    country: address.country
  };
}
