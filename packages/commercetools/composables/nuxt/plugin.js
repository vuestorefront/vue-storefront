/* eslint-disable */
import { setup, createAccessToken } from '@vue-storefront/commercetools-api';
import Middleware from './middleware'

const CT_TOKEN_COOKIE_NAME = 'vsf-commercetools-token';
const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

const mapConfigToSetupObject = ({ moduleOptions, app, additionalProperties = {} }) => {
  return {
      ...moduleOptions,
      ...additionalProperties,
      api: {
        uri: moduleOptions.api.uri,
        authHost: moduleOptions.api.authHost,
        projectKey: moduleOptions.api.projectKey,
        clientId: moduleOptions.api.clientId,
        clientSecret: moduleOptions.api.clientSecret,
        scopes: moduleOptions.api.scopes || [
          'create_anonymous_token:vsf-ct-dev',
          'manage_my_orders:vsf-ct-dev',
          'manage_my_profile:vsf-ct-dev',
          'manage_my_shopping_lists:vsf-ct-dev',
          'manage_my_payments:vsf-ct-dev',
          'view_products:vsf-ct-dev',
          'view_published_products:vsf-ct-dev'
        ]
      },
      locale: app.$cookies.get(moduleOptions.cookies.localeCookieName) || moduleOptions.locale,
      currency: app.$cookies.get(moduleOptions.cookies.currencyCookieName) || moduleOptions.currency,
      country: app.$cookies.get(moduleOptions.cookies.countryCookieName) || moduleOptions.country
    }
  }

Middleware.commercetools = async ({ app }) => {
  if (!process.server) return;

  const newToken = await createAccessToken();
  app.$cookies.set(CT_TOKEN_COOKIE_NAME, newToken);
  setup(mapConfigToSetupObject({ moduleOptions, app }))
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

  setup(
    mapConfigToSetupObject({
      moduleOptions,
      app,
      additionalProperties: {
        currentToken,
        auth: {
          onTokenChange,
          onTokenRemove
        }
      }
    })
  )
};
