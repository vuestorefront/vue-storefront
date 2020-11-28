
import { Logger } from '@vue-storefront/core';
import { isAnonymousSession, isUserSession, getAccessToken } from './helpers';
import { isAnonymousOperation, isUserOperation } from './restrictedOperations';

export const handleBeforeAuth = async ({ sdkAuth, tokenProvider, apolloReq, currentToken }) => {
  const isAnonymous = isAnonymousSession(currentToken);
  const isUser = isUserSession(currentToken);
  const isGuest = !isAnonymous && !isUser;

  if (isGuest && isAnonymousOperation(apolloReq.operationName)) {
    Logger.debug('Apollo authLinkBefore, anonymousFlow', apolloReq.operationName);

    const token = await sdkAuth.anonymousFlow();
    tokenProvider.setTokenInfo(token);
    Logger.debug('Apollo authLinkBefore, anonymousFlow, generated token: ', getAccessToken(token));

    return token;
  }

  return tokenProvider.getTokenInfo();
};

export const handleAfterAuth = async ({ sdkAuth, tokenProvider, apolloReq, currentToken }) => {
  if (!isUserSession(currentToken) && isUserOperation(apolloReq.operationName)) {
    const { email, password } = apolloReq.variables.draft;
    Logger.debug('Apollo authLinkAfter, customerPasswordFlow', apolloReq.operationName);

    const token = await sdkAuth.customerPasswordFlow({ username: email, password });
    tokenProvider.setTokenInfo(token);
    Logger.debug('Apollo authLinkAfter, customerPasswordFlow, generated token: ', getAccessToken(token));

    return token;
  }

  return currentToken;
};

export const handleErrors = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      const parsedLocations = locations.map(({ column, line }) => `[column: ${column}, line: ${line}]`);

      if (!message.includes('Resource Owner Password Credentials Grant')) {
        Logger.error(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
      }
    });
  }

  if (networkError) {
    Logger.error(`[Network error]: ${networkError}`);
  }
};
