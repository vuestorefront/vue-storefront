import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { Token, ApiConfig, Config } from '../../types/setup';
import { FlowOptions } from '../../types/Api';
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

const getTokenFlow = async (settings: Config, sdkAuth: SdkAuth, options: FlowOptions = {}) => {
  const { currentToken } = options;

  if (options.customerCredentials) {
    return sdkAuth.customerPasswordFlow(options.customerCredentials);
  }

  if (options.requireUserSession && !isTokenUserSession(settings, currentToken)) {
    return sdkAuth.anonymousFlow();
  }

  if (currentToken) {
    const tokenActive = await isTokenActive(sdkAuth, currentToken);

    if (tokenActive) {
      return Promise.resolve(currentToken);
    }
  }

  if (options.requireUserSession) {
    return sdkAuth.anonymousFlow();
  }

  return sdkAuth.clientCredentialsFlow();
};

const createAccessToken = async (settings: Config, options: FlowOptions = {}): Promise<Token> => {
  const { api } = settings;
  const sdkAuth = createAuthClient(api);
  const tokenInfo = await getTokenFlow(settings, sdkAuth, options);
  const tokenProvider = new TokenProvider({ sdkAuth }, tokenInfo);

  return tokenProvider.getTokenInfo();
};

export default createAccessToken;
