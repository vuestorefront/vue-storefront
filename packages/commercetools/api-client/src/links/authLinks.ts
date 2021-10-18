import { Logger } from '@vue-storefront/core';
import { isAnonymousSession, isUserSession } from '../helpers/utils';
import { isServerOperation, isAnonymousOperation, isUserOperation } from './restrictedOperations';

/**
 * Returns access token for the Server Middleware. It usually has more permissions than anonymous / user access token.
 *
 * If the configuration doesn't specify server-specific API client configuration, it will fallback to customer access tokens configuration.
 */
async function generateServerAccessToken({
  configuration,
  apolloReq,
  sdkAuth
}): Promise<string> {
  Logger.debug(`Generating server access token for operation "${ apolloReq.operationName }"`);

  const { clientId, clientSecret, scopes } = configuration.serverApi || configuration.api;

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
 * Handler for checking if it's necessary to generate a server or anonymous access token.
 */
export async function handleBeforeAuth({
  configuration,
  sdkAuth,
  tokenProvider,
  apolloReq
}) {
  const currentToken = tokenProvider.getTokenInfo();
  const isGuest = !isAnonymousSession(currentToken) && !isUserSession(currentToken) && isAnonymousOperation(apolloReq.operationName);
  const isServer = isServerOperation(configuration, apolloReq.operationName);

  const customToken = await configuration.customToken?.({
    configuration,
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
      configuration,
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

  return currentToken;
}

/**
 * The handler that generates an access token for the user if all three conditions are met:
 *  - the customer is not already logged in;
 *  - the customer performed one of the user-specific operations;
 *  - response from the commercetools doesn't contain any errors, meaning that the given credentials are valid;
 */
export async function handleAfterAuth({
  sdkAuth,
  tokenProvider,
  apolloReq,
  response
}) {
  const currentToken = tokenProvider.getTokenInfo();

  if (!isUserSession(currentToken) && isUserOperation(apolloReq.operationName) && !response.errors?.length) {
    return generateUserAccessToken({
      apolloReq,
      sdkAuth,
      tokenProvider
    });
  }

  return currentToken;
}
