/* istanbul ignore file */

import { getCurrentInstance, ref } from '@vue/composition-api';

const useLocale = () => {
  const vm = getCurrentInstance() as any;
  const {
    locales: availableLocales,
    locale: defaultLocale,
    setLocaleCookie,
    setLocale: setLocaleI18n
  } = vm.$i18n;

  const availableCountries = availableLocales.map((locale) => locale.country);
  const availableCurrencies = availableLocales.map((locale) => locale.currency);
  const currentLocale = availableLocales.find((locale) => locale.code === defaultLocale);
  const currency = currentLocale.currency;
  const country = currentLocale.country;

  const setCookie = (name) => setLocaleCookie(name);
  const setLocale = (name) => setLocaleI18n(name);

  return {
    availableLocales,
    availableCountries,
    availableCurrencies,
    locale: ref(currentLocale.name),
    currency,
    country,
    setCookie,
    setLocale
  };
};

export default useLocale;
