import fetch from 'isomorphic-fetch';
import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { Config, ApiConfig } from '../types/setup';
import { isAnonymousSession, isUserSession } from '../helpers/utils';

/**
 * Creates an authentication SDK from the commercetools package.
 */
function createAuthClient({
  authHost: host,
  projectKey,
  clientId,
  clientSecret,
  scopes
}: ApiConfig): SdkAuth {
  return new SdkAuth({
    host,
    projectKey,
    disableRefreshToken: false,
    credentials: {
      clientId,
      clientSecret
    },
    scopes,
    fetch
  });
}

/**
 * Creates a token provider from the commercetools package.
 */
function createTokenProvider({ configuration, sdkAuth }) {
  return new TokenProvider(
    {
      sdkAuth,
      fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow(),
      onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
    },
    configuration.auth.onTokenRead()
  );
}

/**
 * Create helpers from the commercetools SDK package.
 */
export function createSdkHelpers(configuration: Config) {
  const sdkAuth = createAuthClient(configuration.api);

  const tokenProvider = createTokenProvider({
    configuration,
    sdkAuth
  });

  return {
    sdkAuth,
    tokenProvider
  };
}

export {
  isAnonymousSession,
  isUserSession
};
