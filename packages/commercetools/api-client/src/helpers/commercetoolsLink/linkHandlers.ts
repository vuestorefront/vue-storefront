import { Logger } from '@vue-storefront/core';
import { isAnonymousSession, isUserSession } from '../utils';
import { isServerOperation, isAnonymousOperation, isUserOperation } from './restrictedOperations';

/**
 * Returns access token for the Server Middleware. It usually has more permissions than anonymous / user access token.
 *
 * If the configuration doesn't specify server-specific API client configuration, it will fallback to customer access tokens configuration.
 */
async function generateServerAccessToken({
  settings,
  apolloReq,
  sdkAuth
}): Promise<string> {
  Logger.debug(`Generating server access token for operation "${ apolloReq.operationName }"`);

  const { clientId, clientSecret, scopes } = settings.serverApi || settings.api;

  const token = await sdkAuth.clientCredentialsFlow({
    credentials: {
      clientId,
      clientSecret
    },
    scopes
  });

  Logger.debug(`Successfully generated server access token for operation "${ apolloReq.operationName }"`);

  return token;
}

/**
 * Returns access token for the anonymous session.
 */
async function generateAnonymousAccessToken({
  apolloReq,
  sdkAuth,
  tokenProvider
}): Promise<string> {
  Logger.debug(`Generating anonymous access token for operation "${ apolloReq.operationName }"`);

  const token = await sdkAuth.anonymousFlow();
  tokenProvider.setTokenInfo(token);

  Logger.debug(`Successfully generated anonymous access token for operation "${ apolloReq.operationName }"`);

  return token;
}

/**
 * Returns access token for the logged in customer.
 */
async function generateUserAccessToken({
  apolloReq,
  sdkAuth,
  tokenProvider
}): Promise<string> {
  Logger.debug(`Generating user access token for operation "${ apolloReq.operationName }"`);

  const { email, password } = apolloReq.variables.draft;
  const token = await sdkAuth.customerPasswordFlow({ username: email, password });
  tokenProvider.setTokenInfo(token);

  Logger.debug(`Successfully generated user access token for operation "${ apolloReq.operationName }"`);

  return token;
}

/**
 * The handler that checks if it's necessary to generate a server or anonymous access token.
 */
export const handleBeforeAuth = async ({
  settings,
  sdkAuth,
  tokenProvider,
  apolloReq,
  currentToken
}) => {
  const isGuest = !isAnonymousSession(currentToken) && !isUserSession(currentToken) && isAnonymousOperation(apolloReq.operationName);
  const isServer = isServerOperation(apolloReq.operationName);

  const customToken = await settings.customToken?.({
    settings,
    isGuest,
    isServer,
    sdkAuth,
    tokenProvider,
    apolloReq,
    currentToken
  });

  if (customToken) {
    return customToken;
  }

  if (isServer) {
    return await generateServerAccessToken({
      settings,
      apolloReq,
      sdkAuth
    });
  }

  if (isGuest) {
    return await generateAnonymousAccessToken({
      apolloReq,
      sdkAuth,
      tokenProvider
    });
  }

  return tokenProvider.getTokenInfo();
};

/**
 * The handler that generates an access token for the user if all three conditions are met:
 *  - the customer is not already logged in;
 *  - the customer performed one of the user-specific operations;
 *  - response from the commercetools doesn't contain any errors, meaning that the given credentials are valid;
 */
export const handleAfterAuth = async ({ sdkAuth, tokenProvider, apolloReq, currentToken, response }) => {
  if (!isUserSession(currentToken) && isUserOperation(apolloReq.operationName) && !response.errors?.length) {
    return generateUserAccessToken({
      apolloReq,
      sdkAuth,
      tokenProvider
    });
  }

  return currentToken;
};

/**
 * The handler that retries requests to the commercetools server if specific conditions are met.
 */
export const handleRetry = ({ settings, tokenProvider }) => (count, operation, error) => {
  if (count > 3) {
    return false;
  }

  const customRetry = settings.customRetry?.({
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
};
