import { Logger } from '@vue-storefront/core';

export default async (context) => {
  const { $vsf } = context;
  const currentToken = $vsf.$ct.config.auth.onTokenRead();
  if (!currentToken) {
    const { token, errors } = await $vsf.$ct.api.requestAuthToken(currentToken);
    $vsf.$ct.config.axios.handleTokenChange(token);

    if (errors.length) {
      errors.forEach(error => {
        Logger.error(error);
      });
    }

    $vsf.$ct.config.auth.onTokenChange(
      JSON.stringify(token),
      token?.expires_at ? { expires: new Date(token.expires_at), path: '/' } : {}
    );
  }
};
