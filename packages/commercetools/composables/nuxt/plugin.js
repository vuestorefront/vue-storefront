/* eslint-disable */
import { createApiClient } from '@vue-storefront/commercetools-api';
import { mapConfigToSetupObject, createIntegration, CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

<% if (!options.disableGenerateTokenMiddleware) { %>
  import Middleware from './middleware'
  import ctTokenMiddleware from '@vue-storefront/commercetools/nuxt/token-middleware'
  import { CT_TOKEN_MIDDLEWARE_SLUG } from '@vue-storefront/commercetools/nuxt/helpers'
  Middleware[CT_TOKEN_MIDDLEWARE_SLUG] = ctTokenMiddleware(moduleOptions);
  <% } %>

export default createIntegration(({ app, $configure }) => {
  const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);
  const onTokenChange = (token) => {
    try {
      app.$cookies.set(CT_TOKEN_COOKIE_NAME, token);
      console.log('TOKEN UPDATE', token.access_token);

    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
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

  $configure(settings)
});
