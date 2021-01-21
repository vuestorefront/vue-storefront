import { Logger } from '@vue-storefront/core';
import { isAnonymousSession, isUserSession, getAccessToken } from '../utils';
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

export const handleRetry = ({ tokenProvider }) => (count, operation, error) => {
  if (count > 3) {
    return false;
  }

  if (error.result.message === 'invalid_token') {
    Logger.debug(`Apollo retry-link, the operation (${operation.operationName}) sent with wrong token, creating a new one... (attempt: ${count})`);
    tokenProvider.invalidateTokenInfo();
    return true;
  }
  return false;
};
