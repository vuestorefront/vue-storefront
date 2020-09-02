/* istanbul ignore file */

import { Ref, computed, watch, watchEffect } from '@vue/composition-api';
import { setup, getSettings } from '@vue-storefront/commercetools-api';
import { LocaleItem } from '@vue-storefront/commercetools-api';
import Cookies from 'js-cookie';
import { onSSR, sharedRef } from '@vue-storefront/core';

/*
  This is the old version of that component.
  Waiting for core useLocaleFactory.
*/

type Locale = Ref<string>
type Country = Ref<string>
type Currency = Ref<string>
type AvailableLocales = Ref<Readonly<LocaleItem[]>>
type AvailableCountries = Ref<Readonly<LocaleItem[]>>
type AvailableCurrencies = Ref<Readonly<LocaleItem[]>>

export default function useLocale() {
  const {
    countries,
    currencies,
    locales,
    currency: defaultCurrency,
    country: defaultCountry,
    locale: defaultLocale,
    cookies
  } = getSettings();
  const loading = sharedRef(false, 'useLocale-loading');
  const error = sharedRef(null, 'useLocale-error');
  const locale: Locale = sharedRef('', 'useLocale-locale');
  const country: Country = sharedRef('', 'useLocale-country');
  const currency: Currency = sharedRef('', 'useLocale-currency');
  const availableLocales: AvailableLocales = computed<LocaleItem[]>(() => locales);
  const availableCountries: AvailableCountries = computed<LocaleItem[]>(() => countries);
  const availableCurrencies: AvailableCurrencies = computed<LocaleItem[]>(() => currencies);

  watchEffect(() => {
    if (!country.value || !currency.value || !locale.value) {
      country.value = Cookies.get(cookies.countryCookieName) || defaultCountry;
      currency.value = Cookies.get(cookies.currencyCookieName) || defaultCurrency;
      locale.value = Cookies.get(cookies.localeCookieName) || defaultLocale;
    }
  });

  watch(country, () => {
    if (!country.value) return;
    Cookies.set(cookies.countryCookieName, country.value);
    setup({ country: country.value });
  });

  watch(currency, () => {
    if (!currency.value) return;
    Cookies.set(cookies.currencyCookieName, currency.value);
    setup({ currency: currency.value });
  });

  onSSR(() => {
    country.value = Cookies.get(cookies.countryCookieName) || defaultCountry;
    currency.value = Cookies.get(cookies.currencyCookieName) || defaultCurrency;
    locale.value = Cookies.get(cookies.localeCookieName) || defaultLocale;
    const configuration = { locale: locale.value, country: country.value, currency: currency.value };
    setup(configuration);
  });

  return {
    locale,
    country,
    currency,
    availableLocales,
    availableCountries,
    availableCurrencies,
    loading,
    error
  };
}
