import SdkAuth from '@commercetools/sdk-auth';
import { getSettings } from './../../index';
import { Token } from '../../types/setup';

const isTokenActive = async (sdkAuth: SdkAuth, token: Token) => {
  const tokenIntrospection = await sdkAuth.introspectToken(token.access_token);

  return tokenIntrospection.active;
};

const isTokenUserSession = (token: Token) => {
  const { handleIsTokenUserSession } = getSettings();

  if (handleIsTokenUserSession) {
    return handleIsTokenUserSession(token);
  }

  return token && (
    token.scope.includes('customer_id') ||
    token.scope.includes('anonymous_id')
  );
};

export { isTokenUserSession, isTokenActive };
