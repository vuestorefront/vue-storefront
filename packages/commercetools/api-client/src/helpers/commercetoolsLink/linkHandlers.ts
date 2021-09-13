import { Logger } from '@vue-storefront/core';
import { getAccessToken } from '../utils';
import { createAuthClient, createTokenProvider } from './authHelpers';

const createSdk = ({ settings, currentToken }) => {
  const sdkAuth = createAuthClient(settings.api);
  const tokenProvider = createTokenProvider(settings, { sdkAuth, currentToken });

  return { sdkAuth, tokenProvider };
};

export const createAuthHandlers = ({ settings, currentToken }) => {
  const { sdkAuth, tokenProvider } = createSdk({ settings, currentToken });

  const obtainBasicToken = async () => tokenProvider.getTokenInfo();

  const obtainAnonymousToken = async ({ apolloReq }) => {
    Logger.debug('Apollo authLinkBefore, anonymousFlow', apolloReq.operationName);

    const token = await sdkAuth.anonymousFlow();
    tokenProvider.setTokenInfo(token);

    Logger.debug('Apollo authLinkBefore, anonymousFlow, generated token: ', getAccessToken(token));

    return token;
  };

  const obtainUserToken = async ({ response, apolloReq }) => {
    const { email, password } = apolloReq.variables.draft;
    Logger.debug('Apollo authLinkAfter, customerPasswordFlow', apolloReq.operationName);

    if (!response.errors?.length) {
      const token = await sdkAuth.customerPasswordFlow({ username: email, password });
      tokenProvider.setTokenInfo(token);
      Logger.debug('Apollo authLinkAfter, customerPasswordFlow, generated token: ', getAccessToken(token));

      return token;
    }

    return currentToken;
  };

  return { obtainAnonymousToken, obtainUserToken, obtainBasicToken };
};
