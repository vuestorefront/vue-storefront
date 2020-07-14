/* eslint-disable */
import { setup } from '@vue-storefront/commercetools-api';
import { mapConfigToSetupObject, CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

<% if (!options.disableMiddleware) { %>
import Middleware from './middleware'
import ctMiddleware from '@vue-storefront/commercetools/nuxt/middleware'
Middleware.commercetools = ctMiddleware(moduleOptions);
<% } %>

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
