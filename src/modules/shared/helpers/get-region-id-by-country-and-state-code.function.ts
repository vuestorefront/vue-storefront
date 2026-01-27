const States = require('@vue-storefront/i18n/resource/states.json');

export function getRegionIdByCountryAndStateCode (country: string, stateCode: string): number | null {
  const countryData = States[country.toUpperCase()];

  if (!countryData) {
    return null;
  }

  const stateItem = countryData.find((stateData: {
    code: string,
    name: string,
    id: number,
    alternative_name?: string
  }) => {
    const isCodeEqual = stateData.code.toUpperCase() === stateCode.toUpperCase();

    if (isCodeEqual) {
      return true;
    }

    const isNameEqual = stateData.name.toLowerCase() === stateCode.toLowerCase();

    if (isNameEqual) {
      return true;
    }

    return stateData.alternative_name?.toLowerCase() === stateCode.toLowerCase();
  });

  return stateItem?.id || null;
}
