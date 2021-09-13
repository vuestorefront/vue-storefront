import { Config } from '../../types/setup';
import { Logger } from '@vue-storefront/core';
import { getAccessToken, isUserSession, isAnonymousSession } from '../utils';
import { isAnonymousOperation, isUserOperation } from './restrictedOperations';
import { createHttpLink } from 'apollo-link-http';
import { createErrorHandler } from './graphqlError';
import { setContext } from 'apollo-link-context';
import { createAuthHandlers } from './linkHandlers';
import { ApolloLink } from 'apollo-link';
import { asyncMap } from '@apollo/client/utilities';

const applyAuthorizationHeader = (headers, currentToken) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${currentToken.access_token}`
  }
});

export const createCommerceToolsConnection = (settings: Config): any => {
  const currentToken: any = settings.auth.onTokenRead();
  const isAnonymous = isAnonymousSession(currentToken);
  const isUser = isUserSession(currentToken);
  const isGuest = !isAnonymous && !isUser;
  Logger.debug('createCommerceToolsConnection', getAccessToken(currentToken));

  const httpLink = createHttpLink({ uri: settings.api.uri, fetch });
  const onErrorLink = createErrorHandler();

  const authLinkBefore = setContext(async (apolloReq, { headers }) => {
    Logger.debug('Apollo authLinkBefore', apolloReq.operationName);

    if (isGuest && isAnonymousOperation(apolloReq.operationName)) {
      const { obtainAnonymousToken } = createAuthHandlers({ settings, currentToken });
      const anonymousToken = await obtainAnonymousToken({ apolloReq });
      Logger.debug('Apollo authLinkBefore, finished, generated token: ', getAccessToken(anonymousToken));

      return applyAuthorizationHeader(headers, anonymousToken);
    }

    if (!currentToken) {
      const { obtainBasicToken } = createAuthHandlers({ settings, currentToken });
      const basicToken = await obtainBasicToken();

      return applyAuthorizationHeader(headers, basicToken);
    }

    return applyAuthorizationHeader(headers, currentToken);
  });

  const authLinkAfter = new ApolloLink((apolloReq, forward): any => {
    return asyncMap(forward(apolloReq) as any, async (response: any) => {
      Logger.debug('Apollo authLinkAfter', apolloReq.operationName);

      if (!isUserSession(currentToken) && isUserOperation(apolloReq.operationName)) {
        const { obtainUserToken } = createAuthHandlers({ settings, currentToken });
        await obtainUserToken({ apolloReq, response });
      }

      const errors = (response.errors || []).filter(({ message }) =>
        !message.includes('Resource Owner Password Credentials Grant') &&
        !message.includes('This endpoint requires an access token issued either')
      );

      return { ...response, errors };
    });
  });

  const apolloLink = ApolloLink.from([
    onErrorLink,
    authLinkBefore,
    authLinkAfter.concat(httpLink)
  ]);

  return { apolloLink };
};
