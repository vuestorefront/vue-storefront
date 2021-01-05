/* istanbul ignore file */
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import * as api from './api';
import { Config, ClientInstance } from './types/setup';
import { createCommerceToolsConnection } from './helpers/commercetoolsLink';
import { defaultSettings } from './helpers/apiClient/defaultSettings';
import { apiClientFactory } from '@vue-storefront/core';

const onSetup = (settings: Config): { config: Config; client: ClientInstance } => {
  const languageMap = settings.languageMap || {};
  const acceptLanguage = settings.acceptLanguage || defaultSettings.acceptLanguage;
  const locale = settings.locale || defaultSettings.locale;

  const config = {
    ...defaultSettings,
    ...settings,
    languageMap,
    acceptLanguage: languageMap[locale] || acceptLanguage,
    auth: settings.auth || defaultSettings.auth
  } as any as Config;

  if (settings.client) {
    return { client: settings.client, config };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: new ApolloClient({
        cache: new InMemoryCache(),
        ...settings.customOptions
      }),
      config
    };
  }

  const { apolloLink, sdkAuth, tokenProvider } = createCommerceToolsConnection(config);

  const client = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ...settings.customOptions
  });
  (client as ClientInstance).sdkAuth = sdkAuth;
  (client as ClientInstance).tokenProvider = tokenProvider;

  return {
    config,
    client
  };
};

const tokenExtension = (req, res) => ({
  beforeSetup: (config) => ({
    ...config,
    auth: {
      onTokenChange: (newToken) => {
        console.log('extension works 1');
        const currentToken = req.cookies['vsf-commercetools-token'] ? JSON.parse(req.cookies['vsf-commercetools-token']) : null;

        if (!currentToken || currentToken.access_token !== newToken.access_token) {
          res.cookie('vsf-commercetools-token', JSON.stringify(newToken));
        }
      },
      onTokenRead: () => {
        console.log('extension works 2');

        res.cookie('vsf-commercetools-token', req.cookies['vsf-commercetools-token']);
        return req.cookies['vsf-commercetools-token'] ? JSON.parse(req.cookies['vsf-commercetools-token']) : null;
      },
      onTokenRemove: () => {
        delete req.cookies['vsf-commercetools-token'];
      }
    }
  })
});

const { createApiClient, integrationPlugin } = apiClientFactory({
  tag: 'ct',
  onSetup,
  api,
  extensions: [tokenExtension]
});

export {
  createApiClient,
  integrationPlugin
};
