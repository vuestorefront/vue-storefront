import { CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers';

const applyCookies = (token) =>
  `${CT_TOKEN_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(token))}`;

export const accessToken = async ({ app }) => {
  if (!process.server) return;

  const token = await app.$vsf.$ct.api.accessToken(app.$cookies.get(CT_TOKEN_COOKIE_NAME));
  app.$vsf.$ct.config.axios.headers.cookie = applyCookies(token);
};
