const States = require('@vue-storefront/i18n/resource/states.json');

export function getRegionNameByCountryAndRegionId (country: string, regionId: number): string {
  const countryData = States[country.toUpperCase()];

  if (!countryData) {
    return '';
  }

  const stateItem = countryData.find((stateData: { code: string, name: string, id: number }) => {
    return stateData.id === regionId;
  });

  return stateItem?.name || '';
}
