import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

export function mapPlacesAddressToBaseAddress (
  addressComponents: google.maps.places.AddressComponent[]
): Partial<BaseAddressDetails> {
  const result: Partial<BaseAddressDetails> = {};

  const findComponent = (types: string[]): google.maps.places.AddressComponent | undefined => {
    for (const type of types) {
      const component = addressComponents.find(c => c.types.includes(type));
      if (component) return component;
    }
    return undefined;
  };

  const streetNumber = findComponent(['street_number']);
  const route = findComponent(['route']);

  if (streetNumber?.longText && route?.longText) {
    result.streetAddress = `${streetNumber.longText} ${route.longText}`;
  } else if (route?.longText) {
    result.streetAddress = route.longText;
  } else if (streetNumber) {
    result.streetAddress = '';
  }

  const subpremise = findComponent(['subpremise']);
  const premise = findComponent(['premise']);

  if (subpremise?.longText) {
    result.apartmentNumber = subpremise.longText;
  } else if (premise?.longText) {
    result.apartmentNumber = premise.longText;
  }

  const city = findComponent(['locality', 'postal_town']);
  if (city?.longText) {
    result.city = city.longText;
  }

  const state = findComponent(['administrative_area_level_1']);
  if (state?.shortText) {
    result.state = state.shortText;
  }

  const postalCode = findComponent(['postal_code']);
  const postalCodeSuffix = findComponent(['postal_code_suffix']);

  if (postalCode?.longText) {
    result.zipCode = postalCode.longText;
    if (postalCodeSuffix?.longText) {
      result.zipCode += `-${postalCodeSuffix.longText}`;
    }
  }

  const country = findComponent(['country']);
  if (country?.shortText) {
    result.country = country.shortText;
  }

  return result;
}
