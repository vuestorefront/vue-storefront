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

    /**
      * Creates server access token for operations that require high permissions.
      * This token is not saved in the cookie.
    */
    case TokenType.ServerAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow({ credentials: { clientId, clientSecret }, scopes })
        }
      );

    /**
      * Creates guest access token for all guest requests and not saved in the cookie.
      * This token is requested on the server and used for all guest requests.
    */
    case TokenType.GuestAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow()
        }
      );

    /**
      * Creates anonymous access token for quest who adds items to the cart/wishlist.
      * This token is saved in the cookie and used for anonymous session.
    */
    case TokenType.AnonymousAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.anonymousFlow(),
          onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo),
          onTokenInfoRefreshed: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
        }
      );

    /**
      * Creates new token provider for existing token
      * This token is taken from the request’s cookie and used for the next anonymous and user sessions.
    */
    case TokenType.ExistingAccessToken:
      return new TokenProvider(
        {
          sdkAuth,
          onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo),
          onTokenInfoRefreshed: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
        },
        configuration.auth.onTokenRead()
      );

    /**
      * Creates user access token for user who is logged in.
      * This token is saved in the cookie and used for user session.
    */
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
