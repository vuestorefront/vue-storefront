import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createCommerceToolsLink from './helpers/createCommerceToolsLink';
import { apiClientFactory } from '@vue-storefront/core';
import { Config, ConfigurableConfig } from './types/setup';

const onSetup = (config: Config) => {
  const languageMap = config.languageMap || {};

  return {
    ...config,
    languageMap,
    acceptLanguage: languageMap[config.locale] || config.acceptLanguage,
    client: new ApolloClient({
      link: createCommerceToolsLink(config),
      cache: new InMemoryCache(),
      ...config.customOptions
    })
  };
};

const { setup, update, getSettings, apiClientMethodFactory } = apiClientFactory<Config, ConfigurableConfig>({
  tag: 'ct',
  onSetup,
  defaultSettings: {
    locale: 'en',
    acceptLanguage: ['en'],
    auth: {
      onTokenChange: () => {}
    },
    cookies: {
      currencyCookieName: 'vsf-currency',
      countryCookieName: 'vsf-country',
      localeCookieName: 'vsf-locale'
    }
  }
});

export {
  apiClientMethodFactory,
  getSettings,
  setup,
  update
};
