import { Context } from '@vue-storefront/core';

const accessToken = (context: Context) => {
  return context.config.auth.onTokenRead();
};

export default accessToken;
