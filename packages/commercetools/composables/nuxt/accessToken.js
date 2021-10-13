import { CT_COOKIE_NAME } from '@vue-storefront/commercetools-api';

const applyCookies = (cookies, token) => `${cookies}; ${CT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(token))}`;

export default async function accessTokenPlugin({ app }) {
  const isServer = typeof window === 'undefined';
  const token = await app.$vsf.$ct.api.accessToken(isServer);

  if (isServer) {

    /**
     * `accessToken` endpoint doesn't create access token cookie if it was called during SSR.
     * For this reason, it's required to add access token to axios during SSR, so that new
     * access token is not requested every time we call an API.
     */
    app.$vsf.$ct.config.axios.headers.cookie = applyCookies(app.$vsf.$ct.config.axios.headers.cookie, token);
  }
}
