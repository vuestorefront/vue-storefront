import config from 'config';

import { CountryValidationConfig } from '../types/country-validation-config';

export function isStateNonPostal (country: string): boolean {
  const countryValidationConfig: CountryValidationConfig = config.address?.countryValidationConfig || {};

  return !!countryValidationConfig[country]?.isStateNonPostal;
}
