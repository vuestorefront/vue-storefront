import fetch from 'isomorphic-fetch';
import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { Config, ApiConfig, TokenType } from '../types/setup';
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
function createTokenProvider({ configuration, sdkAuth, tokenType }) {
  const { clientId, clientSecret, scopes } = configuration.serverApi || configuration.api;
  switch (tokenType) {
    case TokenType.ServerAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow({ credentials: { clientId, clientSecret }, scopes })
        },
        null
      );
    case TokenType.QuestAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow()
        },
        configuration.auth.onTokenRead()
      );
    case TokenType.AnonymousAccesToken:
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.anonymousFlow(),
          onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
        },
        configuration.auth.onTokenRead()
      );
    case TokenType.ExistingAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
        },
        configuration.auth.onTokenRead()
      );
    default:
      return null;
  }
  // return tokenInfo
  //   ? new TokenProvider(
  //     {
  //       sdkAuth,
  //       onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
  //     },
  //     configuration.auth.onTokenRead()
  //   )
  //   : new TokenProvider(
  //     {
  //       sdkAuth,
  //       fetchTokenInfo: accessTokenServer
  //         ? (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow({ credentials: { clientId, clientSecret }, scopes })
  //         : (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow()
  //       // onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
  //     },
  //     accessTokenServer ? null : configuration.auth.onTokenRead()
  //   );
}

/**
 * Create helpers from the commercetools SDK package.
 */
export function createSdkHelpers(configuration: Config, tokenType: TokenType) {
  const sdkAuth = createAuthClient(configuration.api);
  const tokenProvider = createTokenProvider({
    configuration,
    sdkAuth,
    tokenType
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
