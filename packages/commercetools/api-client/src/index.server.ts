import { apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import { Config } from './types/setup';
import { getExtensions } from './extensions';
import { createApolloClient } from './links';
import { defaultSettings } from './helpers/apiClient/defaultSettings';

/**
 * Merges integration configuration with defaults and creates GraphQL client.
 */
function onCreate(configuration: Partial<Config>) {
  const languageMap = configuration.languageMap || {};
  const acceptLanguage = configuration.acceptLanguage || defaultSettings.acceptLanguage;
  const locale = configuration.locale || defaultSettings.locale;

  const config = {
    ...defaultSettings,
    ...configuration,
    languageMap,
    acceptLanguage: languageMap[locale] || acceptLanguage,
    auth: configuration.auth || defaultSettings.auth
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
