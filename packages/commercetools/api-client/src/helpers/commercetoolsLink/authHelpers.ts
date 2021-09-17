import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { Config, ApiConfig } from '../../types/setup';
import { isAnonymousSession, isUserSession } from '../utils';
import fetch from 'isomorphic-fetch';

export const createAuthClient = (config: ApiConfig): SdkAuth => {
  return new SdkAuth({
    host: config.authHost,
    projectKey: config.projectKey,
    disableRefreshToken: false,
    credentials: {
      clientId: config.clientId,
      clientSecret: config.clientSecret
    },
    scopes: config.scopes,
    fetch
  });
};

export const createTokenProvider = (settings: Config, {
  sdkAuth,
  currentToken
}) => {
  return new TokenProvider({
    sdkAuth,
    fetchTokenInfo: (sdkAuthInstance) => sdkAuthInstance.clientCredentialsFlow(),
    onTokenInfoChanged: (tokenInfo) => settings.auth.onTokenChange(tokenInfo),
    onTokenInfoRefreshed: (tokenInfo) => settings.auth.onTokenChange(tokenInfo)
  }, currentToken);
};

export {
  isAnonymousSession,
  isUserSession
};
