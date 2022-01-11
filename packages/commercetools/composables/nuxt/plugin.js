import { integrationPlugin } from '@vue-storefront/core';
import { mapConfigToSetupObject } from '@vue-storefront/commercetools/nuxt/helpers';

const moduleOptions = <%= serialize(options) %>;

export default integrationPlugin(({ app, integration }) => {
  function changeCurrentStore(id) {
    app.$cookies.set(
      app.$vsf.$ct.config.cookies.storeCookieName,
      id
    );
  }

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app,
    additionalProperties: {
      storeService: {
        changeCurrentStore
      }
    }
  });

  integration.configure('ct', settings);
});

