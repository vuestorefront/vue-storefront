import { apiProxyFactory } from '@vue-storefront/core';
import { defaultSettings } from './helpers/apiClient/defaultSettings';
import isGuest from './api/isGuest';

const onCreate = (settings: any) => {
  const languageMap = settings.languageMap || {};
  const acceptLanguage = settings.acceptLanguage || defaultSettings.acceptLanguage;
  const locale = settings.locale || defaultSettings.locale;

  const config = {
    ...defaultSettings,
    ...settings,
    languageMap,
    acceptLanguage: languageMap[locale] || acceptLanguage,
    auth: settings.auth || defaultSettings.auth
  } as any;

  return { config };
};

const { createApiProxy, integrationPlugin } = apiProxyFactory({
  tag: 'ct',
  onCreate,
  api: { isGuest }
});

export {
  createApiProxy,
  integrationPlugin
};
