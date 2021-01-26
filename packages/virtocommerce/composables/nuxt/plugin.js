/* eslint-disable */
import { VC_USER_ID, VC_AUTH_TOKEN, generateUUID} from '@vue-storefront/virtocommerce-api';
import { mapConfigToSetupObject } from '@vue-storefront/commercetools/nuxt/helpers'
import { integrationPlugin } from '@vue-storefront/virtocommerce-api'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin(({ app, integration }) => {
  const getAccessToken =  () => {
    return app.$cookies.get(VC_AUTH_TOKEN);
  };
  const setAccessToken = (token) => {
    return app.$cookies.set(VC_AUTH_TOKEN, token);
  };
  const getUserId = () => {

    let result = app.$cookies.get(VC_USER_ID);
    if (!result) {
      result = generateUUID();
      app.$cookies.set(VC_USER_ID, result);
    }
    return result;
  };
  const setUserId = (userId) => {
    return app.$cookies.set(VC_USER_ID, userId);
  };

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app,
    additionalProperties: {
        getAccessToken,
        setAccessToken,
        getUserId,
        setUserId      
    }
  })

  integration.configure(settings)
});
