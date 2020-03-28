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
import { LocaleItem } from '@vue-storefront/commercetools-api/lib//types/setup';
import Cookies from 'js-cookie';
import { UseLocale } from '@vue-storefront/interfaces';

type Locale = Ref<string>
type Country = Ref<string>
type Currency = Ref<string>
type AvailableLocales = Ref<Readonly<LocaleItem[]>>
type AvailableCountries = Ref<Readonly<LocaleItem[]>>
type AvailableCurrencies = Ref<Readonly<LocaleItem[]>>

export default function useLocale(): UseLocale<Locale, Country, Currency, AvailableLocales, AvailableCountries, AvailableCurrencies> {
  const loading = ref(false);
  const locale: Locale = ref(null);
  const country: Country = ref(null);
  const currency: Currency = ref(null);
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
    if (!country.value) {
      return;
    }
    Cookies.set(cookies.countryCookieName, country.value);
    setup({ country: country.value });
  });

  watch(currency, () => {
    if (!currency.value) {
      return;
    }
    Cookies.set(cookies.currencyCookieName, currency.value);
    setup({ currency: currency.value });
  });

  return {
    locale,
    country,
    currency,
    availableLocales,
    availableCountries,
    availableCurrencies,
    loading: computed(() => loading.value)
  };
}
