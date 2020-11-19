import { createAccessToken } from '@vue-storefront/commercetools-api';
import { CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers';

export default () => async (context) => {
  if (!process.server || context.$settings.currentToken) return;

  const newToken = await createAccessToken(context.$settings);
  context.app.$cookies.set(CT_TOKEN_COOKIE_NAME, newToken);
};
