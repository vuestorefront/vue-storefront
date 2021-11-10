import { ApiClientExtension } from '@vue-storefront/core';
import { defaultSettings } from '../helpers/apiClient/defaultSettings';

function getInternationalizationConfiguration(request, configuration) {
  const cookieSettings = configuration.cookies || defaultSettings.cookies;
  const { currencyCookieName, countryCookieName, localeCookieName, storeCookieName } = cookieSettings;
  const locale = request.cookies[localeCookieName] || configuration.locale || defaultSettings.locale;
  const currency = request.cookies[currencyCookieName] || configuration.currency || defaultSettings.currency;
  const country = request.cookies[countryCookieName] || configuration.country || defaultSettings.country;
  const store = request.cookies[storeCookieName] || configuration.store;

  return { currency, country, locale, store };
}

export const internationalizationExtension: ApiClientExtension = {
  name: 'internationalizationExtension',

  hooks(request) {
    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        ...getInternationalizationConfiguration(request, configuration)
      })
    };
  }
};
