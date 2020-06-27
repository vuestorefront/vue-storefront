/* istanbul ignore file */

import { UseLocaleFactoryParams } from '@vue-storefront/core';
import { settings } from '@vue-storefront/shopify-api';

export const params: UseLocaleFactoryParams = {
  loadAvailableLocales: async () => settings().locales,
  loadAvailableCountries: async () => settings().countries,
  loadAvailableCurrencies: async () => settings().currencies,
  setCountry: async (country) => country,
  setCurrency: async (currency) => currency,
  setLocale: async (locale) => locale
};
