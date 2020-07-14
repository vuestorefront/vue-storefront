import defaultConfig from '@vue-storefront/commercetools/nuxt/defaultConfig';

export const mapConfigToSetupObject = ({ moduleOptions, app, additionalProperties = {} }) => {
  return {
    ...defaultConfig,
    ...moduleOptions,
    ...additionalProperties,
    api: {
      uri: moduleOptions.api.uri,
      authHost: moduleOptions.api.authHost,
      projectKey: moduleOptions.api.projectKey,
      clientId: moduleOptions.api.clientId,
      clientSecret: moduleOptions.api.clientSecret,
      scopes: moduleOptions.api.scopes || defaultConfig.api.scopes
    },
    locale: (moduleOptions.cookies && app.$cookies.get(moduleOptions.cookies.localeCookieName)) || moduleOptions.locale || defaultConfig.locale,
    currency: (moduleOptions.cookies && app.$cookies.get(moduleOptions.cookies.currencyCookieName)) || moduleOptions.currency || defaultConfig.currency,
    country: (moduleOptions.cookies && app.$cookies.get(moduleOptions.cookies.countryCookieName)) || moduleOptions.country || defaultConfig.country
  };
};

export const CT_TOKEN_COOKIE_NAME = 'vsf-commercetools-token';
