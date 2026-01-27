import config from 'config';

import { CountryValidationConfig } from '../types/country-validation-config';

const DEFAULT_STATE_COMPONENT_TYPE = 'administrative_area_level_1';

export function getStateComponentType (country: string | undefined): string {
  if (!country) {
    return DEFAULT_STATE_COMPONENT_TYPE;
  }

  const countryValidationConfig: CountryValidationConfig = config.address?.countryValidationConfig || {};

  return countryValidationConfig[country]?.stateComponentType || DEFAULT_STATE_COMPONENT_TYPE;
}
