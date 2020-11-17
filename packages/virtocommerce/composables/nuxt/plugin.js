import { setup, VC_USER_ID, VC_AUTH_TOKEN, generateUUID} from '@vue-storefront/virtocommerce-api';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default function init({ app }) {
  moduleOptions.getAccessToken = function () {
    return app.$cookies.get(VC_AUTH_TOKEN);
  };
  moduleOptions.setAccessToken = function (token) {
    return app.$cookies.set(VC_AUTH_TOKEN, token);
  };
  moduleOptions.getUserId = function () {

    let result = app.$cookies.get(VC_USER_ID);
    if (!result) {
      result = generateUUID();
      app.$cookies.set(VC_USER_ID, result);
    }
    return result;
  };
  moduleOptions.setUserId = function (userId) {
    return app.$cookies.set(VC_USER_ID, userId);
  };
  setup(moduleOptions);
}
