const States = require('@vue-storefront/i18n/resource/states.json');

export function getRegionIdByCountryAndStateCode (country: string, stateCode: string): number | null {
  const countryData = States[country.toUpperCase()];

  if (!countryData) {
    return null;
  }

  const stateItem = countryData.find((stateData: { code: string, name: string, id: number }) => {
    const isCodeEqual = stateData.code.toUpperCase() === stateCode.toUpperCase();

    if (isCodeEqual) {
      return true;
    }

    return stateData.name.toLowerCase() === stateCode.toLowerCase();
  });

  return stateItem?.id || null;
}
