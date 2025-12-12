import config from 'config';

export function shouldUseStateFromAddressComponents (country: string | undefined): boolean {
  if (!country) {
    return false;
  }

  const useStateFromAddressComponentsCountriesList: string[] = config.address?.useStateFromAddressComponents || [];

  return !!useStateFromAddressComponentsCountriesList.find(
    (item) => item.toLowerCase() === country.toLowerCase()
  );
}
