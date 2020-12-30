import { apiClientFactory, integrationPluginFactory } from '@vue-storefront/core';
import { defaultSettings } from './../../helpers/apiClient/defaultSettings';
// import isGuest from './../../api/isGuest';
import * as api from './../../api';

const onProxySetup = (settings: any) => {
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

const { createApiClient: createProxyApiClient } = apiClientFactory<any, any>({
  tag: 'ct',
  onSetup: onProxySetup,
  api: Object.keys(api),
  isProxy: true
});

const integrationProxyPlugin = integrationPluginFactory(createProxyApiClient);

export {
  createProxyApiClient,
  integrationProxyPlugin
};
