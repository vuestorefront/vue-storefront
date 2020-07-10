/*eslint-disable*/
import { setup, createAccessToken } from '@vue-storefront/commercetools-api';
import Middleware from './middleware'

const CT_TOKEN_COOKIE_NAME = 'vsf-commercetools-token';
// const moduleOptions = <%= JSON.stringify(options) %>;

Middleware.commercetools = async ({ app }) => {
  if (!process.server) return;

  const newToken = await createAccessToken();

  app.$cookies.set(CT_TOKEN_COOKIE_NAME, newToken);

  setup({
    ...moduleOptions,
    currentToken: newToken,
    locale: app.$cookies.get(moduleOptions.cookies.localeCookieName),
    currency: app.$cookies.get(moduleOptions.cookies.currencyCookieName),
    country: app.$cookies.get(moduleOptions.cookies.countryCookieName)
  });
}

export default ({ app }) => {
  const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);

  const onTokenChange = (token) => {
    try {
      if (!process.server) {
        app.$cookies.set(CT_TOKEN_COOKIE_NAME, token);
        setup({ currentToken: token });
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
    setup({ currentToken: null, forceToken: true });
  };

  setup({
    // ...<%= JSON.stringify(options) %>,
    api: {
      uri: '<%= options.api.uri %>',
      authHost: '<%= options.api.authHost %>',
      projectKey: '<%= options.api.projectKey %>',
      clientId: '<%= options.api.clientId %>',
      clientSecret: '<%= options.api.clientSecret %>',
      scopes: [
        'create_anonymous_token:vsf-ct-dev',
        'manage_my_orders:vsf-ct-dev',
        'manage_my_profile:vsf-ct-dev',
        'manage_my_shopping_lists:vsf-ct-dev',
        'manage_my_payments:vsf-ct-dev',
        'view_products:vsf-ct-dev',
        'view_published_products:vsf-ct-dev'
      ]
    },
    locale: app.$cookies.get('<%= options.cookies.localeCookieName %>') || '<%= options.locale %>',
    currency: app.$cookies.get('<%= options.cookies.currencyCookieName %>') || '<%= options.currency %>',
    country: app.$cookies.get('<%= options.cookies.countryCookieName %>') || '<%= options.country %>',
    currentToken,
    auth: {
      onTokenChange,
      onTokenRemove
    }
  });
};
