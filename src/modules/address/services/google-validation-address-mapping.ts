import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { getRegionIdByCountryAndStateCode } from 'src/modules/shared';

function fallbackToPostalAddress (response: any): Partial<BaseAddressDetails> {
  const result: Partial<BaseAddressDetails> = {};

  try {
    const postalAddress = response?.result?.address?.postalAddress;

    if (!postalAddress) {
      return result;
    }

    if (postalAddress.addressLines && postalAddress.addressLines.length > 0) {
      result.streetAddress = postalAddress.addressLines[0];
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
    console.warn('[fallbackToPostalAddress] Error mapping postal address:', error);
    return result;
  }
}

export function mapValidationResponseToBaseAddress (
  response: any
): Partial<BaseAddressDetails> {
  const result: Partial<BaseAddressDetails> = {};

  try {
    const addressComponents = response?.result?.address?.addressComponents;
    const postalAddress = response?.result?.address?.postalAddress;

    if (!addressComponents || !Array.isArray(addressComponents)) {
      return fallbackToPostalAddress(response);
    }

    const findComponent = (type: string): any => {
      return addressComponents.find((c: any) => c.componentType === type);
    };

    const streetNumber = findComponent('street_number');
    const route = findComponent('route');
    const subpremise = findComponent('subpremise');

    if (streetNumber && route) {
      result.streetAddress = `${streetNumber.componentName.text} ${route.componentName.text}`;
    } else if (route) {
      result.streetAddress = route.componentName.text;
    }

    if (subpremise && result.streetAddress) {
      result.streetAddress = `${result.streetAddress} ${subpremise.componentName.text}`;
    }

    const locality = findComponent('locality');
    if (locality) {
      result.city = locality.componentName.text;
    }

    if (postalAddress?.regionCode) {
      result.country = postalAddress.regionCode;
    }

    const state = findComponent('administrative_area_level_1');
    if (state && postalAddress?.regionCode) {
      const regionId = getRegionIdByCountryAndStateCode(
        postalAddress.regionCode,
        state.componentName.text
      );

      if (regionId !== null) {
        result.region_id = regionId;
        result.state = '';
      } else {
        result.state = state.componentName.text;
        result.region_id = null;
      }
    }

    const postalCode = findComponent('postal_code');
    const postalCodeSuffix = findComponent('postal_code_suffix');

    if (postalCode) {
      result.zipCode = postalCode.componentName.text;
      if (postalCodeSuffix) {
        result.zipCode += `-${postalCodeSuffix.componentName.text}`;
      }
    }

    if (Object.keys(result).length === 0) {
      return fallbackToPostalAddress(response);
    }

    return result;
  } catch (error) {
    console.warn('[mapValidationResponseToBaseAddress] Error mapping address components:', error);
    return fallbackToPostalAddress(response);
  }
}
