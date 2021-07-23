import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { Logger, Context } from '@vue-storefront/core';
import { ApiConfig, Token } from '../../types/setup';
import { isAnonymousSession, isUserSession, getAccessToken } from '../../helpers/utils';
import { isAnonymousOperation, isUserOperation } from '../../helpers/commercetoolsLink/restrictedOperations';

const requestAuthToken = async (context: Context, currentToken: string) => {
  const { config, req, res, client } = context;

  const url = req.url;
  let token;

  const createSdkAuth = (config: ApiConfig): SdkAuth => {
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

  const createTokenProvider = (sdkAuth: SdkAuth, currentToken: string): TokenProvider => {
    return new TokenProvider({
      sdkAuth,
      fetchTokenInfo: async (sdkAuthInstance: SdkAuth) => await sdkAuthInstance.clientCredentialsFlow(),
      onTokenInfoChanged: (tokenInfo: Token) => {
        Logger.debug('TokenProvider.onTokenInfoChanged', getAccessToken(tokenInfo));
      },
      onTokenInfoRefreshed: (tokenInfo: Token) => {
        Logger.debug('TokenProvider.onTokenInfoRefreshed', getAccessToken(tokenInfo));
      }
    }, currentToken);
  };

  const getBeforeAuthToken = async ({ sdkAuth, tokenProvider, url, currentToken }): Promise<Token> => {
    const isAnonymous = isAnonymousSession(currentToken);
    const isUser = isUserSession(currentToken);
    const isGuest = !isAnonymous && !isUser;

    if (isGuest && isAnonymousOperation(url)) {
      Logger.debug('Apollo authLinkBefore, anonymousFlow', url);

      const token = await sdkAuth.anonymousFlow();
      tokenProvider.setTokenInfo(token);
      Logger.debug('Apollo authLinkBefore, anonymousFlow, generated token: ', getAccessToken(token));

      return token;
    }

    return tokenProvider.getTokenInfo();
  };

  const getAfterAuthToken = async ({ sdkAuth, tokenProvider, req, currentToken, res }): Promise<Token> => {
    const { email, password } = req.params.user;
    Logger.debug('Apollo authLinkAfter, customerPasswordFlow', req.url);

    if (!res.errors?.length) {
      const token = await sdkAuth.customerPasswordFlow({ username: email, password });
      tokenProvider.setTokenInfo(token);
      Logger.debug('Apollo authLinkAfter, customerPasswordFlow, generated token: ', getAccessToken(token));

      return token;
    }

    return currentToken;
  };

  const sdkAuth = createSdkAuth(config.api);
  const tokenProvider = createTokenProvider(sdkAuth, currentToken);

  token = await getBeforeAuthToken({ sdkAuth, tokenProvider, url, currentToken });

  if (!isUserSession(currentToken) && isUserOperation(url)) {
    token = await getAfterAuthToken({ sdkAuth, tokenProvider, req, currentToken, res });
  }
  const errors = (res.errors || []).filter(({ message }) =>
    !message.includes('Resource Owner Password Credentials Grant') &&
    !message.includes('This endpoint requires an access token issued either')
  );

  client.sdkAuth = sdkAuth;
  client.tokenProvider = tokenProvider;

  return {
    token,
    errors
  };
};

export default requestAuthToken;
