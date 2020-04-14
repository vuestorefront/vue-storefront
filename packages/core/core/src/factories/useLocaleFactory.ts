import { computed, Ref, ref } from '@vue/composition-api';
import { AgnosticCountry, AgnosticCurrency, AgnosticLocale, UseLocale } from '../types';

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
  const currentLocale: Ref<AgnosticLocale> = ref(null);
  const currentCountry: Ref<AgnosticCountry> = ref(null);
  const currentState: Ref<AgnosticCurrency> = ref(null);
  const availableLocalesState: Ref<AgnosticLocale[]> = ref([]);
  const availableCountriesState: Ref<AgnosticCountry[]> = ref([]);
  const availableCurrenciesState: Ref<AgnosticCurrency[]> = ref([]);

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
    currentState.value = await factoryParams.setCurrency(currency);
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
      currency: computed<AgnosticCurrency>(() => currentState.value),
      availableLocales: computed<AgnosticLocale[]>(() => availableLocalesState.value),
      availableCountries: computed<AgnosticCountry[]>(() => availableCountriesState.value),
      availableCurrencies: computed<AgnosticCurrency[]>(() => availableCurrenciesState.value)
    };
  };
}
