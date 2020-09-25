import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { Token, ApiConfig } from '../../types/setup';
import { FlowOptions } from '../../types/Api';
import { getSettings } from './../../index';
import { isTokenActive, isTokenUserSession } from './../token';

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
  const { currentToken } = getSettings();

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

  if (options.requireUserSession && !isTokenUserSession(currentToken)) {
    return sdkAuth.anonymousFlow();
  }

  if (currentToken) {
    const tokenActive = await isTokenActive(sdkAuth, currentToken);

    if (tokenActive) {
      return Promise.resolve(currentToken);
    }
  }

  return sdkAuth.clientCredentialsFlow();
};

const createAccessToken = async (options: FlowOptions = {}): Promise<Token> => {
  const { api } = getSettings();
  const sdkAuth = createAuthClient(api);
  const tokenInfo = await getTokenFlow(sdkAuth, options);
  const tokenProvider = new TokenProvider({ sdkAuth }, tokenInfo);

  return tokenProvider.getTokenInfo();
};

export default createAccessToken;
