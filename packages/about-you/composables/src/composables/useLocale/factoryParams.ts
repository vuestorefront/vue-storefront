/* istanbul ignore file */

import { UseLocaleFactoryParams } from '@vue-storefront/core';
import { getSettings } from '@vue-storefront/about-you-api';

export const params: UseLocaleFactoryParams = {
  loadAvailableLocales: async () => getSettings().locales,
  loadAvailableCountries: async () => getSettings().countries,
  loadAvailableCurrencies: async () => getSettings().currencies,
  setCountry: async (country) => country,
  setCurrency: async (currency) => currency,
  setLocale: async (locale) => locale
};
