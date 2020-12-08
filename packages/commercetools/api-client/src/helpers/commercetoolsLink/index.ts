/* istanbul ignore file */
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import fetch from 'isomorphic-fetch';
import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { asyncMap } from '@apollo/client/utilities';
import { Logger } from '@vue-storefront/core';
import { onError } from 'apollo-link-error';
import { Config, ApiConfig } from './../../types/setup';
import { handleBeforeAuth, handleAfterAuth, handleErrors, handleRetry } from './linkHandlers';
import { isAnonymousSession, isUserSession } from './helpers';

const getAccessToken = (token) => token ? token.access_token : null;

const createAuthClient = (config: ApiConfig): SdkAuth =>
  new SdkAuth({
    host: config.authHost,
    projectKey: config.projectKey,
    disableRefreshToken: false,
    credentials: {
      clientId: config.clientId,
      clientSecret: config.clientSecret
    },
    scopes: config.scopes
  });

const createTokenProvider = (settings: Config, { sdkAuth, currentToken }) =>
  new TokenProvider({
    sdkAuth,
    fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow(),
    onTokenInfoChanged: (tokenInfo) => {
      Logger.debug('TokenProvider.onTokenInfoChanged', getAccessToken(tokenInfo));
      settings.auth.onTokenChange(tokenInfo);
    },
    onTokenInfoRefreshed: (tokenInfo) => {
      Logger.debug('TokenProvider.onTokenInfoRefreshed', getAccessToken(tokenInfo));

    }
  }, currentToken);

const createHeaders = (currentHeaders, token) => ({
  headers: {
    ...currentHeaders,
    authorization: `Bearer ${token.access_token}`
  }
});

const createCommerceToolsConnection = (settings: Config): any => {
  let currentToken: any = settings.auth.onTokenRead();
  Logger.debug('createCommerceToolsConnection', getAccessToken(currentToken));

  const sdkAuth = createAuthClient(settings.api);
  const tokenProvider = createTokenProvider(settings, { sdkAuth, currentToken });
  const httpLink = createHttpLink({ uri: settings.api.uri, fetch });

  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    handleErrors({ graphQLErrors, networkError });
  });

  const authLinkBefore = setContext(async (apolloReq, { headers }) => {
    Logger.debug('Apollo authLinkBefore', apolloReq.operationName);
    currentToken = await handleBeforeAuth({ sdkAuth, tokenProvider, apolloReq, currentToken });
    Logger.debug('Apollo authLinkBefore, finished, generated token: ', getAccessToken(currentToken));

    return createHeaders(headers, currentToken);
  });

  const authLinkAfter = new ApolloLink((apolloReq, forward): any => {
    return asyncMap(forward(apolloReq) as any, async (response: any) => {
      Logger.debug('Apollo authLinkAfter', apolloReq.operationName);
      currentToken = await handleAfterAuth({ sdkAuth, tokenProvider, apolloReq, currentToken });

      const errors = (response.errors || []).filter(({ message }) =>
        !message.includes('Resource Owner Password Credentials Grant') &&
        !message.includes('This endpoint requires an access token issued either')
      );

      return { ...response, errors };
    });
  });

  const errorRetry = new RetryLink({
    attempts: handleRetry({ tokenProvider }),
    delay: () => 0
  });

  const apolloLink = ApolloLink.from([onErrorLink, errorRetry, authLinkBefore, authLinkAfter.concat(httpLink)]);

  return {
    apolloLink,
    sdkAuth,
    tokenProvider
  };
};

export {
  isAnonymousSession,
  isUserSession,
  createCommerceToolsConnection
};
