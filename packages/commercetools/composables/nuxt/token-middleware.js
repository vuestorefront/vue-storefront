import { createAccessToken } from '@vue-storefront/commercetools-api';
import { CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers';

export default () => async (context) => {
  if (!process.server || context.$vsfCT.config.currentToken) return;

  const { currentToken } = context.$vsfCT.config;
  const newToken = await createAccessToken(context.$vsfCT.config, { currentToken });
  context.app.$cookies.set(CT_TOKEN_COOKIE_NAME, newToken);
};
