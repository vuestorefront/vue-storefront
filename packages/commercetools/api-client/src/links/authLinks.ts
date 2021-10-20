import { Logger } from '@vue-storefront/core';
import { AccessTokenResult, TokenType } from '../types/setup';
import { isUserSession, isAnonymousSession } from '../helpers/utils';
import { isServerOperation, isUserOperation, isAnonymousOperation } from './restrictedOperations';
import { createSdkHelpers } from './sdkHelpers';

/**
 * Returns access token for the Server Middleware. It usually has more permissions than anonymous / user access token.
 *
 * If the configuration doesn't specify server-specific API client configuration, it will fallback to customer access tokens configuration.
 */
async function getServerAccessToken({
  configuration,
  apolloReq
}): Promise<AccessTokenResult> {
  Logger.debug(`Get server access token for operation "${ apolloReq.operationName }"`);

  const currentToken = await configuration.serverTokenProvider.getTokenInfo();

  Logger.debug(`Successfully get server access token for operation "${ apolloReq.operationName }"`);

  return {
    currentToken,
    authLinkSdkAuth: configuration.serverTokenProvider.sdkAuth,
    authLinkTokenProvider: configuration.serverTokenProvider
  };
}

/**
 * Returns guest access token.
 */
async function getGuestAccessToken({
  configuration
}): Promise<any> {
  Logger.debug('Get guest access token from provider');

  const currentToken = await configuration.questTokenProvider.getTokenInfo();

  return {
    currentToken,
    authLinkSdkAuth: configuration.questTokenProvider.sdkAuth,
    authLinkTokenProvider: configuration.questTokenProvider
  };
}

/**
 * Returns existing access token.
 */
async function getTokenProviderForExistingToken({
  configuration
}): Promise<any> {
  Logger.debug('Generating provider token for existing token');

  const { tokenProvider } = createSdkHelpers(configuration, TokenType.ExistingAccessToken);
  const currentToken = await tokenProvider.getTokenInfo();

  Logger.debug('Successfully generated provider token for existing token');

  return {
    currentToken,
    authLinkSdkAuth: tokenProvider.sdkAuth,
    authLinkTokenProvider: tokenProvider
  };
}

/**
 * Returns access token for the anonymous session.
 */
export async function generateAnonymousAccessToken({
  configuration,
  apolloReq
}): Promise<AccessTokenResult> {
  Logger.debug(`Generating anonymous access token for operation "${ apolloReq.operationName }"`);

  const { tokenProvider } = createSdkHelpers(configuration, TokenType.AnonymousAccesToken);
  const currentToken = await tokenProvider.getTokenInfo();

  Logger.debug(`Successfully generated anonymous access token for operation "${ apolloReq.operationName }"`);

  return {
    currentToken,
    authLinkSdkAuth: tokenProvider.sdkAuth,
    authLinkTokenProvider: tokenProvider
  };
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
  apolloReq
}) {
  const existingToken = configuration.auth.onTokenRead();
  const isAnonymousRequestToken = !isAnonymousSession(existingToken) && !isUserSession(existingToken) && isAnonymousOperation(apolloReq.operationName);
  const isServer = isServerOperation(configuration, apolloReq.operationName);

  const customToken = await configuration.customToken?.({
    configuration,
    isServer,
    apolloReq
  });

  if (customToken) {
    return customToken;
  }

  if (isServer) {
    return await getServerAccessToken({
      configuration,
      apolloReq
    });
  }

  if (existingToken && !isAnonymousRequestToken) {
    return await getTokenProviderForExistingToken({
      configuration
    });
  }

  if (isAnonymousRequestToken) {
    return await generateAnonymousAccessToken({
      configuration,
      apolloReq
    });
  }

  return await getGuestAccessToken({
    configuration
  });
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
