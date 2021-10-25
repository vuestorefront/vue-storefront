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
function createTokenProvider({ configuration, sdkAuth, tokenType, apolloReq }) {
  const { clientId, clientSecret, scopes } = configuration.serverApi || configuration.api;

  switch (tokenType) {
    case TokenType.ServerAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow({ credentials: { clientId, clientSecret }, scopes })
        }
      );
    case TokenType.QuestAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow()
        }
      );
    case TokenType.AnonymousAccesToken:
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.anonymousFlow(),
          onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo),
          onTokenInfoRefreshed: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
        }
      );
    case TokenType.ExistingAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo),
          onTokenInfoRefreshed: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
        },
        configuration.auth.onTokenRead()
      );
    case TokenType.UserAccessToken:
      const { email, password } = apolloReq.variables.draft;
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.customerPasswordFlow({ username: email, password }),
          onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo),
          onTokenInfoRefreshed: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
        }
      );
    default:
      return null;
  }
}

/**
 * Create helpers from the commercetools SDK package.
 */
export function createSdkHelpers(configuration: Config, tokenType: TokenType, apolloReq?: any) {
  const sdkAuth = createAuthClient(configuration.api);
  const tokenProvider = createTokenProvider({
    configuration,
    sdkAuth,
    tokenType,
    apolloReq
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
