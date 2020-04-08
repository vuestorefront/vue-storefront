import SdkAuth from '@commercetools/sdk-auth';
import { Token, ApiConfig, CustomerCredentials } from '../../types/setup';
import { api } from './../../index';

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

const anonymousFlow = async (config: ApiConfig): Promise<Token> => {
  const authClient = createAuthClient(config);

  return authClient.anonymousFlow();
};

const customerPasswordFlow = async (config: ApiConfig, credentials: CustomerCredentials): Promise<Token> => {
  const authClient = createAuthClient(config);

  return authClient.customerPasswordFlow(credentials);
};

const refreshTokenFlow = async (config: ApiConfig, refreshToken: string): Promise<Token> => {
  const authClient = createAuthClient(config);

  return authClient.refreshTokenFlow(refreshToken);
};

const isTokenExpired = (token: Token): boolean => Date.now() > token.expires_at;

const createAccessToken = async (options: FlowOptions = {}): Promise<Token> => {
  const { currentToken } = options;

  if (options.customerCredentials) {
    return customerPasswordFlow(api, options.customerCredentials);
  }

  if (currentToken && !isTokenExpired(currentToken)) {
    return Promise.resolve(currentToken);
  }

  if (!currentToken) {
    return anonymousFlow(api);
  }

  if (isTokenExpired(currentToken)) {
    return refreshTokenFlow(api, currentToken.refresh_token);
  }
};

export default createAccessToken;
