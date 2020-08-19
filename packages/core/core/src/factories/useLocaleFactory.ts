import { computed, Ref, ref } from '@vue/composition-api';
import { AgnosticCountry, AgnosticCurrency, AgnosticLocale, UseLocale } from '../types';
import { ssrRef } from '../utils';

export type UseLocaleFactoryParams = {
  setLocale: (locale: AgnosticLocale) => Promise<AgnosticLocale>;
  setCountry: (country: AgnosticCountry) => Promise<AgnosticCountry>;
  setCurrency: (currency: AgnosticCurrency) => Promise<AgnosticCurrency>;
  loadAvailableLocales: () => Promise<AgnosticLocale[]>;
  loadAvailableCountries: () => Promise<AgnosticCountry[]>;
  loadAvailableCurrencies: () => Promise<AgnosticCurrency[]>;
};

export function useLocaleFactory(factoryParams: UseLocaleFactoryParams) {
  const loading: Ref<boolean> = ref(false);
  const currentLocale: Ref<AgnosticLocale> = ssrRef(null);
  const currentCountry: Ref<AgnosticCountry> = ssrRef(null);
  const currentCurrency: Ref<AgnosticCurrency> = ssrRef(null);
  const availableLocalesState: Ref<AgnosticLocale[]> = ssrRef([]);
  const availableCountriesState: Ref<AgnosticCountry[]> = ssrRef([]);
  const availableCurrenciesState: Ref<AgnosticCurrency[]> = ssrRef([]);

  const setLocale = async (locale: AgnosticLocale) => {
    loading.value = true;
    currentLocale.value = await factoryParams.setLocale(locale);
    loading.value = false;
  };
  const setCountry = async (country: AgnosticCountry) => {
    loading.value = true;
    currentCountry.value = await factoryParams.setCountry(country);
    loading.value = false;
  };
  const setCurrency = async (currency: AgnosticCurrency) => {
    loading.value = true;
    currentCurrency.value = await factoryParams.setCurrency(currency);
    loading.value = false;
  };
  const loadAvailableLocales = async () => {
    availableLocalesState.value = await factoryParams.loadAvailableLocales();
  };
  const loadAvailableCountries = async () => {
    availableCountriesState.value = await factoryParams.loadAvailableCountries();
  };
  const loadAvailableCurrencies = async () => {
    availableCurrenciesState.value = await factoryParams.loadAvailableCurrencies();
  };

  return function useLocale(): UseLocale {
    return {
      loadAvailableLocales,
      loadAvailableCountries,
      loadAvailableCurrencies,
      setCountry,
      setCurrency,
      setLocale,
      loading: computed<boolean>(() => loading.value),
      locale: computed<AgnosticLocale>(() => currentLocale.value),
      country: computed<AgnosticCountry>(() => currentCountry.value),
      currency: computed<AgnosticCurrency>(() => currentCurrency.value),
      availableLocales: computed<AgnosticLocale[]>(() => availableLocalesState.value),
      availableCountries: computed<AgnosticCountry[]>(() => availableCountriesState.value),
      availableCurrencies: computed<AgnosticCurrency[]>(() => availableCurrenciesState.value)
    };
  };
}
