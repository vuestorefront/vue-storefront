
import { createAccessToken } from '@vue-storefront/commercetools-api';
import { setup } from '@vue-storefront/commercetools-api';
import moduleOptions from '../integration.config.js';
import { mapConfigToSetupObject } from '@vue-storefront/commercetools/nuxt/helpers';

const CT_TOKEN_COOKIE_NAME = 'vsf-commercetools-token';

export default async ({ app }) => {
  if (!process.server) return;

  const newToken = await createAccessToken();

  app.$cookies.set(CT_TOKEN_COOKIE_NAME, newToken);

  const config = mapConfigToSetupObject({
    app,
    moduleOptions
  });

  setup({
    ...config,
    currentToken: newToken,
    locale: app.$cookies.get(config.cookies.localeCookieName),
    currency: app.$cookies.get(config.cookies.currencyCookieName),
    country: app.$cookies.get(config.cookies.countryCookieName)
  });
};
