/* istanbul ignore file */

import { UseLocale, AgnosticCountry, AgnosticCurrency, AgnosticLocale, useLocaleFactory, UseLocaleFactoryParams } from '@vue-storefront/core';

const params: UseLocaleFactoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocale: (locale: AgnosticLocale) => new Promise<AgnosticLocale>(() => {}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCountry: (country: AgnosticCountry) => new Promise<AgnosticCountry>(() => {}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCurrency: (currency: AgnosticCurrency) => new Promise<AgnosticCurrency>(() => {}),
  loadAvailableLocales: () => new Promise<AgnosticLocale[]>(() => {}),
  loadAvailableCountries: () => new Promise<AgnosticCountry[]>(() => {}),
  loadAvailableCurrencies: () => new Promise<AgnosticCurrency[]>(() => {})
};

const useLocale: () => UseLocale = useLocaleFactory(params);

export default useLocale;
