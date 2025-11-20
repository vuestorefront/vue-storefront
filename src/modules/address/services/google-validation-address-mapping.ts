import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { getRegionIdByCountryAndStateCode } from 'src/modules/shared';
import { GoogleValidationResponse } from '../types/google-validation-response';

export function mapValidationResponseToBaseAddress (
  response: GoogleValidationResponse
): Partial<BaseAddressDetails> {
  const result: Partial<BaseAddressDetails> = {};

  try {
    const postalAddress = response?.result?.address?.postalAddress;

    if (!postalAddress) {
      return result;
    }

    if (postalAddress.addressLines && postalAddress.addressLines.length > 0) {
      result.streetAddress = postalAddress.addressLines.join(' ');
    }

    if (postalAddress.locality) {
      result.city = postalAddress.locality;
    }

    if (postalAddress.regionCode) {
      result.country = postalAddress.regionCode;
    }

    if (postalAddress.administrativeArea && postalAddress.regionCode) {
      const regionId = getRegionIdByCountryAndStateCode(
        postalAddress.regionCode,
        postalAddress.administrativeArea
      );

      if (regionId !== null) {
        result.region_id = regionId;
        result.state = '';
      } else {
        result.state = postalAddress.administrativeArea;
        result.region_id = null;
      }
    }

    if (postalAddress.postalCode) {
      result.zipCode = postalAddress.postalCode;
    }

    return result;
  } catch (error) {
    console.warn('[mapValidationResponseToBaseAddress] Error mapping address:', error);
    return result;
  }
}
