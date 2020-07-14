import defaultConfig from '@vue-storefront/commercetools/nuxt/defaultConfig';

const getLocaleSettings = (moduleOptions, app) => {
  if (!moduleOptions.cookies) {
    return {
      locale: moduleOptions.locale || defaultConfig.locale,
      country: moduleOptions.currency || defaultConfig.currenc,
      currency: moduleOptions.country || defaultConfig.country
    };
  }

  return {
    locale: app.$cookies.get(moduleOptions.cookies.localeCookieName),
    country: app.$cookies.get(moduleOptions.cookies.currencyCookieName),
    currency: app.$cookies.get(moduleOptions.cookies.countryCookieName)
  };
};

export const mapConfigToSetupObject = ({ moduleOptions, app, additionalProperties = {} }) => {
  return {
    ...defaultConfig,
    ...moduleOptions,
    ...additionalProperties,
    ...getLocaleSettings(moduleOptions, app),
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
