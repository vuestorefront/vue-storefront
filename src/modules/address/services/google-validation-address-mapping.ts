import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import { GoogleValidationResponse } from '../types/google-validation-response';
import { mapPostalAddressToBaseAddress } from './postal-address-mapper';

export function mapValidationResponseToBaseAddress (
  response: GoogleValidationResponse
): Partial<BaseAddressDetails> {
  try {
    const address = response?.result?.englishLatinAddress || response?.result?.address;
    const postalAddress = address?.postalAddress;

    return mapPostalAddressToBaseAddress(postalAddress);
  } catch (error) {
    console.warn('[mapValidationResponseToBaseAddress] Error mapping address:', error);
    return {};
  }
}
