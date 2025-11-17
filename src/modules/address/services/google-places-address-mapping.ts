import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

export function mapPlacesAddressToBaseAddress (
  addressComponents: google.maps.GeocoderAddressComponent[]
): Partial<BaseAddressDetails> {
  const result: Partial<BaseAddressDetails> = {};

  const findComponent = (types: string[]): google.maps.GeocoderAddressComponent | undefined => {
    for (const type of types) {
      const component = addressComponents.find(c => c.types.includes(type));
      if (component) return component;
    }
    return undefined;
  };

  const streetNumber = findComponent(['street_number']);
  const route = findComponent(['route']);

  if (streetNumber && route) {
    result.streetAddress = `${streetNumber.long_name} ${route.long_name}`;
  } else if (route) {
    result.streetAddress = route.long_name;
  } else if (streetNumber) {
    result.streetAddress = '';
  }

  const subpremise = findComponent(['subpremise']);
  const premise = findComponent(['premise']);

  if (subpremise) {
    result.apartmentNumber = subpremise.long_name;
  } else if (premise) {
    result.apartmentNumber = premise.long_name;
  }

  const city = findComponent(['locality', 'postal_town']);
  if (city) {
    result.city = city.long_name;
  }

  const state = findComponent(['administrative_area_level_1']);
  if (state) {
    result.state = state.short_name;
  }

  const postalCode = findComponent(['postal_code']);
  const postalCodeSuffix = findComponent(['postal_code_suffix']);

  if (postalCode) {
    result.zipCode = postalCode.long_name;
    if (postalCodeSuffix) {
      result.zipCode += `-${postalCodeSuffix.long_name}`;
    }
  }

  const country = findComponent(['country']);
  if (country) {
    result.country = country.short_name;
  }

  return result;
}
