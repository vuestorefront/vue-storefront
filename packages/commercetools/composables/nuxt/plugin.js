/* eslint-disable */
import { setup } from '@vue-storefront/commercetools-api';
import { mapConfigToSetupObject, CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

<% if (!options.disableGenerateTokenMiddleware) { %>
import Middleware from './middleware'
import ctTokenMiddleware from '@vue-storefront/commercetools/nuxt/token-middleware'
import { CT_TOKEN_MIDDLEWARE_SLUG } from '@vue-storefront/commercetools/nuxt/helpers'
Middleware[CT_TOKEN_MIDDLEWARE_SLUG] = ctTokenMiddleware(moduleOptions);
<% } %>

const registerIntegration = (config, inject) => {
  const { tag, settings } = setup(config)
  console.log('registering')
  inject('vsf', { [tag]: settings });
}

export default ({ app }, inject) => {
  const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);
  const onTokenChange = (token) => {
    try {
      if (!process.server) {
        app.$cookies.set(CT_TOKEN_COOKIE_NAME, token);
        registerIntegration({ currentToken: token }, inject);
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
    registerIntegration({ currentToken: null, forceToken: true }, inject);
  };

  const settings = mapConfigToSetupObject({
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
  registerIntegration(settings, inject);
};
