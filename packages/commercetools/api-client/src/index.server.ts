/* istanbul ignore file */
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import * as api from './api';
import { Config, ClientInstance, CT_COOKIE_NAME } from './types/setup';
import { createCommerceToolsConnection } from './helpers/commercetoolsLink/createCommerceToolsConnection';
import { defaultSettings } from './helpers/apiClient/defaultSettings';
import { apiClientFactory, ApiClientExtension } from '@vue-storefront/core';

const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {
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

const parseToken = (rawToken) => {
  try {
    return JSON.parse(rawToken);
  } catch (e) {
    return null;
  }
};

const getI18nConfig = (req, configuration) => {
  const cookieSettings = configuration.cookies || defaultSettings.cookies;
  const { currencyCookieName, countryCookieName, localeCookieName, storeCookieName } = cookieSettings;
  const locale = req.cookies[localeCookieName] || configuration.locale || defaultSettings.locale;
  const currency = req.cookies[currencyCookieName] || configuration.currency || defaultSettings.currency;
  const country = req.cookies[countryCookieName] || configuration.country || defaultSettings.country;
  const store = req.cookies[storeCookieName] || configuration.store;

  return { currency, country, locale, store };
};

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => {
    const rawCurrentToken = req.cookies['vsf-commercetools-token'];
    const currentToken = parseToken(rawCurrentToken);

    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        ...getI18nConfig(req, configuration),
        auth: {
          onTokenChange: (token) => res.cookie(
            CT_COOKIE_NAME,
            JSON.stringify(token),
            token?.expires_at ? { expires: new Date(token.expires_at) } : {}
          ),

          onTokenRead: () => currentToken,

          onTokenRemove: () => res.clearCookie(CT_COOKIE_NAME)
        }
      })
    };
  }
};

const logMailExtension: ApiClientExtension = {
  name: 'logMailExtension',
  extendApiMethods: {
    customerCreatePasswordResetToken: async (context, email) => {
      const response = await api.customerCreatePasswordResetToken(context, email);
      const token = response?.data?.customerCreatePasswordResetToken?.value;

      const emailObject = {
        to: email,
        from: 'password-recovery@vue-storefront.io',
        subject: `Password recovery for ${email}`,
        html: `<a href='/reset-password?token=${token}'>Reset your password by clicking this link</a>`
      };

      console.log(JSON.stringify(emailObject));
      return response;
    }
  }
};

const extensions = [tokenExtension];

if (process.env.NODE_ENV === 'development') {
  extensions.push(logMailExtension);
}

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
  extensions
});

export {
  createApiClient,
  api
};
