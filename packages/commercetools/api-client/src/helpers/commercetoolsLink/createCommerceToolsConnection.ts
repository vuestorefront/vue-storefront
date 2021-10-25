import { Config } from '../../types/setup';
import { Logger } from '@vue-storefront/core';
import { createHttpLink } from 'apollo-link-http';
import { createErrorHandler } from './graphqlError';
import { setContext } from 'apollo-link-context';
import { handleAfterAuth, handleBeforeAuth, handleRetry } from './linkHandlers';
import { ApolloLink } from 'apollo-link';
import { asyncMap } from '@apollo/client/utilities';
import { RetryLink } from 'apollo-link-retry';
import { createAuthClient, createTokenProvider } from './authHelpers';

const customFetch = (uri, options) => fetch(uri, { ...options, keepalive: true });

export const createCommerceToolsConnection = (settings: Config): any => {
  let currentToken: any = settings.auth.onTokenRead();
  const sdkAuth = createAuthClient(settings.api);
  const tokenProvider = createTokenProvider(settings, { sdkAuth, currentToken });
  const httpLink = createHttpLink({ uri: settings.api.uri, fetch: customFetch });
  const onErrorLink = createErrorHandler();

  const authLinkBefore = setContext(async (apolloReq, { headers }) => {
    Logger.debug('Apollo authLinkBefore', apolloReq.operationName);

    currentToken = await handleBeforeAuth({
      settings,
      sdkAuth,
      tokenProvider,
      apolloReq,
      currentToken
    });

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${currentToken.access_token}`
      }
    };
  });

  const authLinkAfter = new ApolloLink((apolloReq, forward): any => {
    return asyncMap(forward(apolloReq) as any, async (response: any) => {
      Logger.debug('Apollo authLinkAfter', apolloReq.operationName);
      currentToken = await handleAfterAuth({ sdkAuth, tokenProvider, apolloReq, currentToken, response });

      const errors = (response.errors || []).filter(({ message }) =>
        !message.includes('Resource Owner Password Credentials Grant') &&
        !message.includes('This endpoint requires an access token issued either')
      );

      return { ...response, errors };
    });
  });

  const errorRetry = new RetryLink({
    attempts: handleRetry({ settings, tokenProvider }),
    delay: {
      initial: 300,
      max: 1000,
      jitter: true
    }
  });

  const apolloLink = ApolloLink.from([
    onErrorLink,
    errorRetry,
    authLinkBefore,
    authLinkAfter.concat(httpLink)
  ]);

  return {
    apolloLink,
    sdkAuth,
    tokenProvider
  };
};
