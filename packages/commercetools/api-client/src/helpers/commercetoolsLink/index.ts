import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import fetch from 'isomorphic-fetch';
import { asyncMap } from '@apollo/client/utilities';
import { Logger } from '@vue-storefront/core';
import { onError } from 'apollo-link-error';
import { Config } from '../../types/setup';
import { handleRetry } from './linkHandlers';
import { isAnonymousSession, isUserSession, getAccessToken } from '../utils';

const createErrorHandler = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        if (!message.includes('Resource Owner Password Credentials Grant')) {
          if (!locations) {
            Logger.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
            return;
          }

          const parsedLocations = locations.map(({ column, line }) => `[column: ${column}, line: ${line}]`);

          Logger.error(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
        }
      });
    }

    if (networkError) {
      Logger.error(`[Network error]: ${networkError}`);
    }
  });
};

const createCommerceToolsConnection = (settings: Config): any => {
  const currentToken: any = settings.auth.onTokenRead();
  Logger.debug('createCommerceToolsConnection', getAccessToken(currentToken));

  const httpLink = createHttpLink({ uri: settings.api.uri, fetch });
  const onErrorLink = createErrorHandler();

  const authLinkBefore = setContext(async (apolloReq, { headers }) => {
    Logger.debug('Apollo authLinkBefore', apolloReq.operationName);
    Logger.debug('Apollo authLinkBefore, finished, generated token: ', getAccessToken(currentToken));

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

      const errors = (response.errors || []).filter(({ message }) =>
        !message.includes('Resource Owner Password Credentials Grant') &&
        !message.includes('This endpoint requires an access token issued either')
      );

      return { ...response, errors };
    });
  });

  const errorRetry = new RetryLink({
    attempts: handleRetry(),
    delay: () => 0
  });

  const apolloLink = ApolloLink.from([onErrorLink, errorRetry, authLinkBefore, authLinkAfter.concat(httpLink)]);

  return {
    apolloLink
  };
};

export {
  isAnonymousSession,
  isUserSession,
  createErrorHandler,
  createCommerceToolsConnection
};
