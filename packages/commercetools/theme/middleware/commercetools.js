import { createAccessToken } from '@vue-storefront/commercetools-api';
import { setup } from '@vue-storefront/commercetools-api';
import { config } from './../plugins/commercetools-config';

const CT_TOKEN_COOKIE_NAME = 'vsf-commercetools-token';

export default async ({ app }) => {
  let currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);

  if (!currentToken) {
    currentToken = await createAccessToken();
  }

  app.$cookies.set(CT_TOKEN_COOKIE_NAME, currentToken);

  setup({
    ...config,
    currentToken,
    locale: app.$cookies.get(config.cookies.localeCookieName),
    currency: app.$cookies.get(config.cookies.currencyCookieName),
    country: app.$cookies.get(config.cookies.countryCookieName)
  });
};

