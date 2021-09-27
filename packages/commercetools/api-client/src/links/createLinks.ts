import { Logger } from '@vue-storefront/core';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { asyncMap } from '@apollo/client/utilities';
import { ApolloLink, FetchResult } from 'apollo-link';
import { Config } from '../types/setup';
import { handleAfterAuth, handleBeforeAuth } from './authLinks';
import { createSdkHelpers } from './sdkHelpers';

/**
 * Creates handler for logging certain GraphQL and network errors.
 */
export function createErrorHandler(): ApolloLink {
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
}

/**
 * Creates handler for retrying requests to the commercetools server if specific conditions are met.
 */
export function createRetryHandler({ configuration, tokenProvider }): ApolloLink {
  return new RetryLink({
    attempts: (count, operation, error) => {
      if (count > 3) {
        return false;
      }

      const customRetry = configuration.customRetry?.({
        count,
        operation,
        error
      });

      if (customRetry) {
        return true;
      }

      if (error?.result?.message === 'invalid_token') {
        Logger.debug(`Apollo retry-link, the operation (${operation.operationName}) sent with wrong token, creating a new one... (attempt: ${count})`);
        tokenProvider.invalidateTokenInfo();
        return true;
      }

      return false;
    },
    delay: () => 0
  });
}

/**
 * Creates ApolloLink for Apollo GraphQL client.
 */
export function createLinks(configuration: Config): ApolloLink {
  const { sdkAuth, tokenProvider } = createSdkHelpers(configuration);

  const tokenLink = setContext(async (apolloReq, { headers }) => {
    Logger.debug('Apollo authLinkBefore', apolloReq.operationName);

    const currentToken = await handleBeforeAuth({
      configuration,
      sdkAuth,
      tokenProvider,
      apolloReq
    });

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${currentToken.access_token}`
      }
    };
  });

  const authLink = new ApolloLink((apolloReq, forward): any => {
    return asyncMap(forward(apolloReq) as any, async (response: FetchResult) => {
      Logger.debug('Apollo authLinkAfter', apolloReq.operationName);

      await handleAfterAuth({
        sdkAuth,
        tokenProvider,
        apolloReq,
        response
      });

      const errors = (response.errors || []).filter(({ message }) =>
        !message.includes('Resource Owner Password Credentials Grant') &&
        !message.includes('This endpoint requires an access token issued either')
      );

      return {
        ...response,
        errors
      };
    });
  });

  const httpLink = createHttpLink({
    uri: configuration.api.uri,
    fetch
  });

  return ApolloLink.from([
    createErrorHandler(),
    createRetryHandler({ configuration, tokenProvider }),
    tokenLink,
    authLink.concat(httpLink)
  ]);
}
