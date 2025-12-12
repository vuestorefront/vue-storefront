import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { getRegionIdByCountryAndStateCode } from 'src/modules/shared';

import { GoogleValidationResponse, GoogleValidationResponseAddress, GoogleValidationResponseAddressComponent } from '../types/google-validation-response';
import { mapPostalAddressToBaseAddress } from './postal-address-mapper';

function mapAddressComponentsToBaseAddress (
  addressComponents: GoogleValidationResponseAddress['addressComponents']
): Partial<BaseAddressDetails> {
  const result: Partial<BaseAddressDetails> = {};

  function findComponent (type: string): GoogleValidationResponseAddressComponent | undefined {
    return addressComponents?.find((item) => item.componentType === type);
  }

  const administrativeArea = findComponent('administrative_area_level_1');
  const country = findComponent('country');

  if (administrativeArea?.componentName?.text && country?.componentName?.text) {
    result.region_id = getRegionIdByCountryAndStateCode(
      administrativeArea.componentName.text,
      country.componentName.text
    );
  }

  return result;
}

export function mapValidationResponseToBaseAddress (
  response: GoogleValidationResponse
): Partial<BaseAddressDetails> {
  try {
    const address = response?.result?.englishLatinAddress || response?.result?.address;
    const postalAddress = address?.postalAddress;
    const mappedAddressComponents = mapAddressComponentsToBaseAddress(address?.addressComponents);

    return mapPostalAddressToBaseAddress(postalAddress, mappedAddressComponents);
  } catch (error) {
    console.warn('[mapValidationResponseToBaseAddress] Error mapping address:', error);
    return {};
  }
}
