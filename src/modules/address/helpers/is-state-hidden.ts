import config from 'config';

import { CountryValidationConfig } from '../types/country-validation-config';

export function isStateHidden (country: string): boolean {
  const countryValidationConfig: CountryValidationConfig = config.address?.countryValidationConfig || {};

  return !!countryValidationConfig[country]?.hideState;
}
