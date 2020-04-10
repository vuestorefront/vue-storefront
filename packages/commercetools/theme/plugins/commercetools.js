import { setup } from '@vue-storefront/commercetools-api';
import { config } from './commercetools-config';

const CT_TOKEN_COOKIE_NAME = 'vsf-commercetools-token';

export default ({ app }) => {
  const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);

  const onTokenChange = (token) => {
    try {
      if (!process.server) {
        app.$cookies.set(CT_TOKEN_COOKIE_NAME, token);
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
  };

  setup({
    ...config,
    locale: app.$cookies.get(config.cookies.localeCookieName) || config.locale,
    currency: app.$cookies.get(config.cookies.currencyCookieName) || config.currency,
    country: app.$cookies.get(config.cookies.countryCookieName) || config.country,
    currentToken,
    auth: {
      onTokenChange,
      onTokenRemove
    }
  });
};
