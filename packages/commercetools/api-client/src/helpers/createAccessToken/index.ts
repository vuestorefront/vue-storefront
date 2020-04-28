import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { Token, ApiConfig, CustomerCredentials } from '../../types/setup';
import { api, currentToken } from './../../index';

interface FlowOptions {
  currentToken?: Token;
  customerCredentials?: CustomerCredentials;
}

const createAuthClient = (config: ApiConfig): SdkAuth =>
  new SdkAuth({
    host: config.authHost,
    projectKey: config.projectKey,
    disableRefreshToken: false,
    credentials: {
      clientId: config.clientId,
      clientSecret: config.clientSecret
    },
    scopes: config.scopes
  });

const getCurrentToken = (options: FlowOptions = {}) => {
  if (currentToken) {
    return currentToken;
  }

  return options.currentToken;
};

const getTokenFlow = async (sdkAuth: SdkAuth, options: FlowOptions = {}) => {
  const currentToken = getCurrentToken(options);

  if (options.customerCredentials) {
    return sdkAuth.customerPasswordFlow(options.customerCredentials);
  }

  if (currentToken) {
    const tokenIntrospection = await sdkAuth.introspectToken(currentToken.access_token);

    if (tokenIntrospection.active) {
      return Promise.resolve(currentToken);
    }
  }

  return sdkAuth.anonymousFlow();
};

const createAccessToken = async (options: FlowOptions = {}): Promise<Token> => {
  const sdkAuth = createAuthClient(api);
  const tokenInfo = await getTokenFlow(sdkAuth, options);
  const tokenProvider = new TokenProvider({ sdkAuth }, tokenInfo);

  return tokenProvider.getTokenInfo();
};

export default createAccessToken;
