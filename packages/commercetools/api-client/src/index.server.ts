import { apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import { Config } from './types/setup';
import { getExtensions } from './extensions';
import { createApolloClient } from './links';
import { defaultSettings } from './helpers/apiClient/defaultSettings';

/**
 * Merges integration configuration with defaults and creates GraphQL client.
 */
function onCreate(projectSettings: Partial<Config>) {
  const languageMap = projectSettings.languageMap || {};
  const acceptLanguage = projectSettings.acceptLanguage || defaultSettings.acceptLanguage;
  const locale = projectSettings.locale || defaultSettings.locale;

  const config = {
    ...defaultSettings,
    ...projectSettings,
    languageMap,
    acceptLanguage: languageMap[locale] || acceptLanguage,
    auth: projectSettings.auth || defaultSettings.auth
  } as Config;

  return {
    config,
    client: config.client || createApolloClient(config)
  };
}

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
  extensions: getExtensions()
});

export {
  createApiClient,
  api
};
