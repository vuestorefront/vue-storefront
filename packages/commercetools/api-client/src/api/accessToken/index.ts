import { Context } from '@vue-storefront/core';
import { createSdkHelpers } from 'src/links/sdkHelpers';

const accessToken = async (context: Context) => {
  const { tokenProvider } = createSdkHelpers(context.config);

  return tokenProvider.getTokenInfo();
};

export default accessToken;
