import { integrationPlugin } from '@vue-storefront/virtocommerce';
import { VC_USER_ID, VC_AUTH_TOKEN, generateUUID} from '@vue-storefront/virtocommerce-api';

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

  integration.configure({
    ...moduleOptions,
    app,
    getAccessToken,
    setAccessToken,
    getUserId,
    setUserId
  });
});
