/* istanbul ignore file */

import { UseLocaleFactoryParams } from '@vue-storefront/factories';

import {
  countries,
  currencies,
  locales
} from '@vue-storefront/about-you-api';

export const params: UseLocaleFactoryParams = {
  loadAvailableLocales: async () => locales,
  loadAvailableCountries: async () => countries,
  loadAvailableCurrencies: async () => currencies,
  setCountry: async (country) => country,
  setCurrency: async (currency) => currency,
  setLocale: async (locale) => locale
};
