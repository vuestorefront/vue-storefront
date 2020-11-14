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


// TODO: MOVE to nuxt module
const registerIntegration = (fn) => (ctx, inject) => {
  const configure = (config) => {
    const { tag, settings } = config;
    inject('vsf', { [tag]: settings });
  }
  return fn({ ...ctx, vsf: { configure } }, inject)
}

export default registerIntegration(({ app, vsf }) => {
  const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);
  const onTokenChange = (token) => {
    try {
      if (!process.server) {
        app.$cookies.set(CT_TOKEN_COOKIE_NAME, token);
        registerIntegration(setup({ currentToken: token }));
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
    vsf.configure(setup({ currentToken: null, forceToken: true }));
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
  vsf.configure(setup(settings));
});
