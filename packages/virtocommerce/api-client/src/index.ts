import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createVirtoCommerceLink from './helpers/create-virtocommerce-link';
import { ApiConfig, LocaleItem, SetupConfig } from './types';

import getMe from './api/getMe';
import getProduct from './api/getProduct';

let apolloClient: ApolloClient<any> = null;
let api: ApiConfig = null;
let locale = 'en';
let currency = 'USD';
let country = 'USA';
let countries: LocaleItem[] = [{ name: 'USA', label: 'USA' }];
let currencies: LocaleItem[] = [{ name: 'USD', label: 'USD' }];
let locales: LocaleItem[] = [{ name: 'en', label: 'en' }];
let acceptLanguage = ['en'];
let languageMap = {};
let cookies = {
  currencyCookieName: 'vsf-vc-currency',
  countryCookieName: 'vsf-vc-country',
  localeCookieName: 'vsf-vc-locale'
};

const setup = <TCacheShape>(setupConfig: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  api = setupConfig.api || api;
  locale = setupConfig.locale || locale;
  currency = setupConfig.currency || currency;
  country = setupConfig.country || country;
  countries = setupConfig.countries || countries;
  currencies = setupConfig.currencies || currencies;
  locales = setupConfig.locales || locales;
  languageMap = setupConfig.languageMap || languageMap;
  acceptLanguage = languageMap[locale] || setupConfig.acceptLanguage || acceptLanguage;
  cookies = setupConfig.cookies || cookies;

  if (setupConfig.api) {
    apolloClient = new ApolloClient({
      link: createVirtoCommerceLink(),
      cache: new InMemoryCache(),
      ...setupConfig.customOptions
    });
  }

  return apolloClient;
};

export {
  api,
  apolloClient,

  locale,
  locales,
  acceptLanguage,
  country,
  countries,
  currency,
  currencies,
  cookies,

  setup,
  getMe,
  getProduct
};
