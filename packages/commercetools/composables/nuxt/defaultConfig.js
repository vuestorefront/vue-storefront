import { VSF_LOCALE_COOKIE, VSF_CURRENCY_COOKIE, VSF_COUNTRY_COOKIE, VSF_STORE_COOKIE } from '@vue-storefront/core';

export default {
  disableGenerateTokenMiddleware: false,
  cookies: {
    currencyCookieName: VSF_CURRENCY_COOKIE,
    countryCookieName: VSF_COUNTRY_COOKIE,
    localeCookieName: VSF_LOCALE_COOKIE,
    storeCookieName: VSF_STORE_COOKIE
  }
};
