
import { createAccessToken, setup, cookies } from '@vue-storefront/commercetools-api';
import { CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers';

export default async ({ app }) => {
  if (!process.server) return;

  const newToken = await createAccessToken();

  app.$cookies.set(CT_TOKEN_COOKIE_NAME, newToken);

  setup({
    currentToken: newToken,
    locale: app.$cookies.get(cookies.localeCookieName),
    currency: app.$cookies.get(cookies.currencyCookieName),
    country: app.$cookies.get(cookies.countryCookieName)
  });
};
