import { mapConfigToSetupObject, CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers'
import { integrationPlugin } from '@vue-storefront/core'

const moduleOptions = <%= serialize(options) %>;

export default integrationPlugin(({ app, integration }) => {
  const onTokenChange = (newToken) => {
    try {
      const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);

      if (!currentToken || currentToken.access_token !== newToken.access_token) {
        app.$cookies.set(CT_TOKEN_COOKIE_NAME, newToken);
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
  }

  const onTokenRead = () => {
    return app.$cookies.get(CT_TOKEN_COOKIE_NAME);
  };

  /**
   * changeCurrentStore
   * @param {string} id
   * @returns {void}
   */
  const changeCurrentStore = (id) => {
    app.$cookies.set(
      app.$vsf.$ct.config.cookies.storeCookieName, id
    );
  }

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app,
    additionalProperties: {
      auth: {
        onTokenChange,
        onTokenRead,
        onTokenRemove
      },
      storeService: {
        changeCurrentStore
      }
    }
  })

  integration.configure('ct', settings)
});
