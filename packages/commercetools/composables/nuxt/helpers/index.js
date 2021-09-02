import defaultConfig from '@vue-storefront/commercetools/nuxt/defaultConfig';

const getLocaleSettings = (moduleOptions, app) => {

  const cookies = {
    ...defaultConfig.cookies,
    ...moduleOptions.cookies
  };

  const localeSettings = {
    locale: app.$cookies.get(cookies.localeCookieName),
    country: app.$cookies.get(cookies.countryCookieName),
    currency: app.$cookies.get(cookies.currencyCookieName),
    store: app.$cookies.get(cookies.storeCookieName)
  };

  return {
    locale: app.i18n.locale || (localeSettings.locale || moduleOptions.locale || defaultConfig.locale),
    country: localeSettings.country || moduleOptions.country || defaultConfig.country,
    currency: localeSettings.currency || moduleOptions.currency || defaultConfig.currency,
    store: localeSettings.store || moduleOptions.store || defaultConfig.store,
    cookies
  };
};

export const mapConfigToSetupObject = ({ moduleOptions, app, additionalProperties = {} }) => {
  return {
    ...defaultConfig,
    ...moduleOptions,
    ...additionalProperties,
    ...getLocaleSettings(moduleOptions, app)
  };
};

export const CT_TOKEN_COOKIE_NAME = 'vsf-commercetools-token';
