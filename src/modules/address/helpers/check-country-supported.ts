import config from 'config';

import { CountryValidationConfig } from '../types/country-validation-config';

export function checkCountrySupported (country: string): boolean {
  const countryValidationConfig: CountryValidationConfig = config.address?.countryValidationConfig || {};

  return countryValidationConfig.hasOwnProperty(country);
}
