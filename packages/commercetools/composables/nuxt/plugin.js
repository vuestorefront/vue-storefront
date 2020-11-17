/* eslint-disable */
import { setup } from '@vue-storefront/commercetools-api';
import { mapConfigToSetupObject, CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers'
import { registerIntegration } from '@vue-storefront/core';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

<% if (!options.disableGenerateTokenMiddleware) { %>
import Middleware from './middleware'
import ctTokenMiddleware from '@vue-storefront/commercetools/nuxt/token-middleware'
import { CT_TOKEN_MIDDLEWARE_SLUG } from '@vue-storefront/commercetools/nuxt/helpers'
Middleware[CT_TOKEN_MIDDLEWARE_SLUG] = ctTokenMiddleware(moduleOptions);
<% } %>

export default registerIntegration(({ app, vsf }) => {
  const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);

  const onTokenChange = (token) => {
    try {
      if (!process.server) {
        app.$cookies.set(CT_TOKEN_COOKIE_NAME, token);
        vsf.configure(setup({ currentToken: token }));
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
    vsf.configure(setup({ currentToken: null, forceToken: true }));
  };

  vsf.configure(setup(
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
  ))
});
