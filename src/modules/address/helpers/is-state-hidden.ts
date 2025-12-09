import config from 'config';

export function isStateHidden (countryCode: string): boolean {
  const hiddenStateCountries: string[] = config.address?.hiddenStateCountries || [];

  return !!hiddenStateCountries.find(
    (country) => country.toLowerCase() === countryCode.toLowerCase()
  );
}
