import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { getRegionIdByCountryAndStateCode } from 'src/modules/shared';

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
  const result: Partial<BaseAddressDetails> = {};

  if (!postalAddress) {
    return result;
  }

  if (postalAddress.addressLines && postalAddress.addressLines.length > 0) {
    const firstLine = postalAddress.addressLines[0];
    result.streetAddress = firstLine;

    const otherLines = postalAddress.addressLines.slice(1);

    result.apartmentNumber = otherLines.join(' ').trim()
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
  } else if (mappedAddressComponents?.zipCode) {
    result.zipCode = mappedAddressComponents.zipCode;
  }

  if (postalAddress.sublocality) {
    result.streetAddress += `, ${postalAddress.sublocality}`;
  }

  return result;
}
