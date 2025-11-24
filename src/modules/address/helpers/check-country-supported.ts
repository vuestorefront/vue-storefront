import config from 'config';

export function checkCountrySupported (country: string): boolean {
  const supportedCountries = config.address?.validationSupportedCountries || [];
  return supportedCountries.length === 0 || supportedCountries.includes(country);
}
