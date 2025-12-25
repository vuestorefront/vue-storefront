import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { getRegionIdByCountryAndStateCode } from 'src/modules/shared';
import { getStateComponentType } from '../helpers/get-state-component-type';
import { isStateNonPostal } from '../helpers/is-state-non-postal';

export function mapPlacesAddressToBaseAddress (
  addressComponents: google.maps.places.AddressComponent[]
): Partial<BaseAddressDetails> {
  const result: Partial<BaseAddressDetails> = {};

  const findComponent = (types: string[]): google.maps.places.AddressComponent | undefined => {
    for (const type of types) {
      const component = addressComponents.find((item) => item.types.includes(type));

      if (component) return component;
    }

    return undefined;
  };

  const streetNumber = findComponent(['street_number']);
  const route = findComponent(['route']);
  const subpremise = findComponent(['subpremise']);
  const premise = findComponent(['premise']);

  if (streetNumber?.longText && route?.longText) {
    result.streetAddress = `${streetNumber.longText} ${route.longText}`;
  } else if (route?.longText) {
    result.streetAddress = route.longText;
  } else if (streetNumber?.longText) {
    result.streetAddress = streetNumber.longText;
  }

  // Append building name (premise) to the street address if available, e.g. "123 Main St Building A".
  if (result.streetAddress) {
    if (premise?.longText) {
      result.streetAddress = `${result.streetAddress} ${premise.longText}`;
    }
  }

  if (subpremise?.longText) {
    result.apartmentNumber = subpremise.longText;
  }

  // Google doesn't have a single "city" field.
  // 1. locality: Standard city/town (US/EU).
  // 2. postal_town: UK-style postal towns (often more accurate than locality in UK).
  // 3. sublocality_level_1: Districts/neighborhoods (fallback for large Asian cities or when locality is missing).
  const city = findComponent(['locality', 'postal_town', 'sublocality_level_1']);
  if (city?.longText) {
    result.city = city.longText;
  }

  const country = findComponent(['country']);
  if (country?.shortText) {
    result.country = country.shortText;
  }

  if (country?.shortText && !isStateNonPostal(country.shortText)) {
    result.state = ''
    let regionId: number | null = null;

    const stateComponentType = getStateComponentType(country.shortText);
    const state = findComponent([stateComponentType]);

    if (state?.shortText && country?.shortText) {
      regionId = getRegionIdByCountryAndStateCode(
        country.shortText,
        state.shortText
      );
    }

    if (regionId === null && state?.longText) {
      regionId = getRegionIdByCountryAndStateCode(
        country.shortText,
        state.longText
      );
    }
  } else {
    result.state = '';
    result.region_id = null;
  }

  const postalCode = findComponent(['postal_code']);
  const postalCodeSuffix = findComponent(['postal_code_suffix']);

  if (postalCode?.longText) {
    result.zipCode = postalCode.longText;

    if (postalCodeSuffix?.longText) {
      result.zipCode += `-${postalCodeSuffix.longText}`;
    }
  }

  return result;
}
