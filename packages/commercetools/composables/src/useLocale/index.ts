/* istanbul ignore file */

import { ref, Ref, computed, watch } from '@vue/composition-api';
import {
  countries,
  currencies,
  locales,
  currency as defaultCurrency,
  country as defaultCountry,
  locale as defaultLocale,
  cookies,
  setup
} from '@vue-storefront/commercetools-api';
import { LocaleItem } from '@vue-storefront/commercetools-api/lib/types/setup';
import Cookies from 'js-cookie';
import { useSSR, onSSR } from '@vue-storefront/core';

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
  const { initialState, saveToInitialState } = useSSR('ct-locale');
  const loading = ref(false);
  const error = ref(null);
  const locale: Locale = ref(initialState?.locale);
  const country: Country = ref(initialState?.country);
  const currency: Currency = ref(initialState?.currency);
  const availableLocales: AvailableLocales = computed<LocaleItem[]>(() => locales);
  const availableCountries: AvailableCountries = computed<LocaleItem[]>(() => countries);
  const availableCurrencies: AvailableCurrencies = computed<LocaleItem[]>(() => currencies);

  watch(() => {
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
    saveToInitialState(configuration);
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
