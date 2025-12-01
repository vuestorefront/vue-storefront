const States = require('@vue-storefront/i18n/resource/states.json');

export function getStateCodeByCountryAndRegionId (country: string, regionId: number): string | null {
  const countryData = States[country.toUpperCase()];

  if (!countryData) {
    return null;
  }

  const stateItem = countryData.find((stateData: { code: string, name: string, id: number }) => {
    return stateData.id === regionId;
  });

  return stateItem?.code || null;
}
