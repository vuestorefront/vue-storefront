import { Context } from '@vue-storefront/core';
import { createSdkHelpers } from '../../links/sdkHelpers';

const accessToken = (context: Context, isServer: boolean) => {
  const configuration = context.config;

  if (isServer) {
    // Don't add a cookie to the response if the endpoint was called during SSR
    configuration.auth.onTokenChange = () => {};
  }

  const { tokenProvider } = createSdkHelpers(context.config);

  return tokenProvider.getTokenInfo();
};

export default accessToken;
