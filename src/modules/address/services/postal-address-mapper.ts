import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { getRegionIdByCountryAndStateCode } from 'src/modules/shared';

import { isStateNonPostal } from '../helpers/is-state-non-postal';

export interface PostalAddress {
  regionCode?: string,
  addressLines?: string[],
  administrativeArea?: string,
  locality?: string,
  postalCode?: string,
  sublocality?: string,
  languageCode?: string,
  organization?: string,
  recipients?: string[],
  sortingCode?: string
}

export function mapPostalAddressToBaseAddress (
  postalAddress: PostalAddress | undefined,
  mappedAddressComponents?: Partial<BaseAddressDetails>
): Partial<BaseAddressDetails> {
  const result: Partial<BaseAddressDetails> = {
    apartmentNumber: ''
  };

  if (!postalAddress) {
    return result;
  }

  if (postalAddress.addressLines && postalAddress.addressLines.length > 0) {
    result.streetAddress = postalAddress.addressLines.join(', ');
  }

  if (postalAddress.locality) {
    result.city = postalAddress.locality;
  }

  if (postalAddress.regionCode) {
    result.country = postalAddress.regionCode;
  }

  if (postalAddress.regionCode && !isStateNonPostal(postalAddress.regionCode)) {
    result.state = ''
    let regionId: number | null = null;

    if (postalAddress.regionCode && postalAddress.administrativeArea) {
      regionId = getRegionIdByCountryAndStateCode(
        postalAddress.regionCode,
        postalAddress.administrativeArea
      )
    }

    if (regionId === null && mappedAddressComponents?.region_id) {
      regionId = mappedAddressComponents?.region_id;
    }

    result.region_id = regionId;
  } else {
    result.state = '';
    result.region_id = null;
  }

  if (postalAddress.postalCode) {
    result.zipCode = postalAddress.postalCode;
  } else if (mappedAddressComponents?.zipCode) {
    result.zipCode = mappedAddressComponents.zipCode;
  }

  if (postalAddress.sublocality) {
    result.streetAddress += `, ${postalAddress.sublocality}`;
  }

  return result;
}
