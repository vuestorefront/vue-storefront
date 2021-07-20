import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { ApiConfig } from '../../types/setup';
import { Logger } from '@vue-storefront/core';

const requestAuthToken = async (context, currentToken) => {
  const { config } = context;

  const apiConfig = config.api;

  const createAuthClient = (config: ApiConfig): SdkAuth => {
    return new SdkAuth({
      host: config.authHost,
      projectKey: config.projectKey,
      disableRefreshToken: false,
      credentials: {
        clientId: config.clientId,
        clientSecret: config.clientSecret
      },
      scopes: config.scopes
    });
  };

  const createTokenProvider = (sdkAuth: SdkAuth, currentToken) => {
    return new TokenProvider({
      sdkAuth,
      fetchTokenInfo: async (sdkAuthInstance) => await sdkAuthInstance.clientCredentialsFlow(),
      onTokenInfoChanged: (tokenInfo) => {
        Logger.debug('TokenProvider.onTokenInfoChanged', tokenInfo);
      },
      onTokenInfoRefreshed: (tokenInfo) => {
        Logger.debug('TokenProvider.onTokenInfoRefreshed', tokenInfo);
      }
    }, currentToken);
  };

  const authClient = createAuthClient(apiConfig);
  const tokenProvider = createTokenProvider(authClient, currentToken);
  const token = await tokenProvider.getTokenInfo();

  return token;
};

export default requestAuthToken;
