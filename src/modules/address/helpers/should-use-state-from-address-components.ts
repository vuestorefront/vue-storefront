import config from 'config';

import { CountryValidationConfig } from '../types/country-validation-config';

export function shouldUseStateFromAddressComponents (country: string | undefined): boolean {
  if (!country) {
    return false;
  }

  const countryValidationConfig: CountryValidationConfig = config.address?.countryValidationConfig || {};

  return !!countryValidationConfig[country]?.useStateFromAddressComponents;
}
