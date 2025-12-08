import config from 'config';

export function isStateOptional (countryCode: string): boolean {
  const optionalStateCountries: string[] = config.address?.optionalStateCountries || [];

  return !!optionalStateCountries.find(
    (country) => country.toLowerCase() === countryCode.toLowerCase()
  );
}
