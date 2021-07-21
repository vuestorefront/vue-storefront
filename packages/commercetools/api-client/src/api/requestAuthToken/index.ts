import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { ApiConfig } from '../../types/setup';
import { Logger } from '@vue-storefront/core';
import { isAnonymousSession, isUserSession } from '../../helpers/utils';
import { isAnonymousOperation, isUserOperation } from '../../helpers/commercetoolsLink/restrictedOperations';

const requestAuthToken = async (context, currentToken) => {
  const { config, req, res, client } = context;

  const apiConfig = config.api;
  const url = req.url;
  let token;

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
        Logger.debug('TokenProvider.onTokenInfoChanged', tokenInfo.access_token);
      },
      onTokenInfoRefreshed: (tokenInfo) => {
        Logger.debug('TokenProvider.onTokenInfoRefreshed', tokenInfo.access_token);
      }
    }, currentToken);
  };

  const sdkAuth = createAuthClient(apiConfig);
  const tokenProvider = createTokenProvider(sdkAuth, currentToken);

  const getBeforeAuthToken = async ({ sdkAuth, tokenProvider, url, currentToken }) => {
    const isAnonymous = isAnonymousSession(currentToken);
    const isUser = isUserSession(currentToken);
    const isGuest = !isAnonymous && !isUser;

    if (isGuest && isAnonymousOperation(url)) {
      Logger.debug('Apollo authLinkBefore, anonymousFlow', url);

      const token = await sdkAuth.anonymousFlow();
      tokenProvider.setTokenInfo(token);
      Logger.debug('Apollo authLinkBefore, anonymousFlow, generated token: ', token.access_token);

      return token;
    }

    return tokenProvider.getTokenInfo();
  };

  const getAfterAuthToken = async ({ sdkAuth, tokenProvider, req, currentToken, res }) => {
    const { email, password } = req.params.user;
    Logger.debug('Apollo authLinkAfter, customerPasswordFlow', req.url);

    if (!res.errors?.length) {
      const token = await sdkAuth.customerPasswordFlow({ username: email, password });
      tokenProvider.setTokenInfo(token);
      Logger.debug('Apollo authLinkAfter, customerPasswordFlow, generated token: ', token.access_token);

      return token;
    }

    return currentToken;
  };

  token = await getBeforeAuthToken({ sdkAuth, tokenProvider, url, currentToken });

  if (!isUserSession(currentToken) && isUserOperation(url)) {
    token = await getAfterAuthToken({ sdkAuth, tokenProvider, req, currentToken, res });
  }
  const errors = (res.errors || []).filter(({ message }) =>
    !message.includes('Resource Owner Password Credentials Grant') &&
    !message.includes('This endpoint requires an access token issued either')
  );

  if (!client.sdkAuth || !client.tokenProvider) {
    client.sdkAuth = sdkAuth;
    client.tokenProvider = tokenProvider;
  }

  return {
    token,
    errors
  };
};

export default requestAuthToken;
