import { mapConfigToSetupObject, CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers'
import { integrationPlugin } from '@vue-storefront/core'
import { accessToken } from '@vue-storefront/commercetools/nuxt/accessToken'
import Middleware from './middleware'

const moduleOptions = <%= serialize(options) %>;

export default integrationPlugin(({ app, integration }) => {
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
      auth: { onTokenRead },
      storeService: {
        changeCurrentStore
      }
    }
  })

  integration.configure('ct', settings)
});

Middleware.accessToken = accessToken