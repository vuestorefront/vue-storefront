import { Logger } from '@vue-storefront/core';
import { TokenType } from '../types/setup';
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
}): Promise<string> {
  Logger.debug(`Retrieving server access token for operation "${ apolloReq.operationName }"`);

  configuration.auth.setTokenProvider(configuration.serverTokenProvider);
  const currentToken = await configuration.serverTokenProvider.getTokenInfo();

  Logger.debug(`Successfully retrieved server access token for operation "${ apolloReq.operationName }"`);

  return currentToken;
}

/**
 * Returns guest access token.
 */
async function getGuestAccessToken({
  configuration
}): Promise<string> {
  Logger.debug('Retrieving guest access token from token provider for guest operation');

  configuration.auth.setTokenProvider(configuration.guestTokenProvider);
  const currentToken = await configuration.guestTokenProvider.getTokenInfo();

  Logger.debug('Successfully retrieved guest access token from token provider');

  return currentToken;
}

/**
 * Returns existing access token.
 */
async function getTokenProviderForExistingToken({
  configuration
}): Promise<string> {
  Logger.debug('Generating token provider for token from the cookie');

  const { tokenProvider } = createSdkHelpers(configuration, TokenType.ExistingAccessToken);
  configuration.auth.setTokenProvider(tokenProvider);
  const currentToken = await tokenProvider.getTokenInfo();

  Logger.debug('Successfully generated provider token from the cookie');

  return currentToken;
}

/**
 * Returns access token for the anonymous session.
 */
async function generateAnonymousAccessToken({
  configuration,
  apolloReq
}): Promise<string> {
  Logger.debug(`Generating anonymous access token for operation "${ apolloReq.operationName }"`);

  const { tokenProvider } = createSdkHelpers(configuration, TokenType.AnonymousAccessToken);
  configuration.auth.setTokenProvider(tokenProvider);
  const currentToken = await tokenProvider.getTokenInfo();

  Logger.debug(`Successfully generated anonymous access token for operation "${ apolloReq.operationName }"`);

  return currentToken;
}

/**
 * Returns access token for the logged in customer.
 */
async function generateUserAccessToken({
  apolloReq,
  configuration
}): Promise<string> {
  Logger.debug(`Generating user access token for operation "${ apolloReq.operationName }"`);

  const { tokenProvider } = createSdkHelpers(configuration, TokenType.UserAccessToken, apolloReq);
  configuration.auth.setTokenProvider(tokenProvider);
  const currentToken = await tokenProvider.getTokenInfo();

  Logger.debug(`Successfully generated user access token for operation "${ apolloReq.operationName }"`);

  return currentToken;
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
  apolloReq,
  response,
  configuration
}) {

  const tokenProvider = configuration.auth.getTokenProvider();
  const currentToken = tokenProvider.getTokenInfo();

  if (!isUserSession(currentToken) && isUserOperation(apolloReq.operationName) && !response.errors?.length) {
    return generateUserAccessToken({
      apolloReq,
      configuration
    });
  }

  return currentToken;
}
