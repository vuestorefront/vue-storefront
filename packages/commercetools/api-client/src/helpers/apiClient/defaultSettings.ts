import {
  VSF_LOCALE_COOKIE,
  VSF_CURRENCY_COOKIE,
  VSF_COUNTRY_COOKIE,
  VSF_STORE_COOKIE,
  VSF_CHANNEL_COOKIE
} from '@vue-storefront/core';

export const defaultSettings = {
  locale: 'en',
  currency: 'USD',
  country: 'US',
  acceptLanguage: ['en'],
  auth: {
    onTokenChange: () => {},
    onTokenRead: () => '',
    onTokenRemove: () => {}
  },
  storeService: {
    changeCurrentStore: () => {},
    changeCurrentChannel: () => {}
  },
  cookies: {
    currencyCookieName: VSF_CURRENCY_COOKIE,
    countryCookieName: VSF_COUNTRY_COOKIE,
    localeCookieName: VSF_LOCALE_COOKIE,
    storeCookieName: VSF_STORE_COOKIE,
    channelCookieName: VSF_CHANNEL_COOKIE
  }
};
