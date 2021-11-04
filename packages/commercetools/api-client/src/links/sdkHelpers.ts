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
  let parameters: any = { sdkAuth };
  let currentToken: string = null;

  switch (tokenType) {

    /**
      * Creates server access token for operations that require elevated permissions. This token is not saved in the cookie.
    */
    case TokenType.ServerAccessToken:
      parameters = {
        ...parameters,
        fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow({ credentials: { clientId, clientSecret }, scopes })
      };
      break;

    /**
      * Creates guest access token for all guest requests. This token is only stored on the server and not in the cookies.
    */
    case TokenType.GuestAccessToken:
      parameters = {
        ...parameters,
        fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow()
      };
      break;

    /**
      * Creates anonymous access token for guests who just added the items to the cart/wishlist. This token is saved in the cookie.
    */
    case TokenType.AnonymousAccessToken:
      parameters = {
        ...parameters,
        fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.anonymousFlow(),
        onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo),
        onTokenInfoRefreshed: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
      };
      break;

    /**
      * Creates a new token provider for the anonymous or user token from the request’s cookie.
    */
    case TokenType.ExistingAccessToken:
      currentToken = configuration.auth.onTokenRead();
      parameters = {
        ...parameters,
        onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo),
        onTokenInfoRefreshed: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
      };
      break;

    /**
      * Creates user access token for the user who just logged in or registered a new account. This token is saved in the cookie.
    */
    case TokenType.UserAccessToken:
      const { email, password } = apolloReq.variables.draft;
      parameters = {
        ...parameters,
        fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.customerPasswordFlow({ username: email, password }),
        onTokenInfoChanged: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo),
        onTokenInfoRefreshed: (tokenInfo) => configuration.auth.onTokenChange(tokenInfo)
      };
      break;
  }

  return new TokenProvider(parameters, currentToken);
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
