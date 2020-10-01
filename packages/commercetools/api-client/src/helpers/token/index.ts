import SdkAuth from '@commercetools/sdk-auth';
import { Token } from '../../types/setup';

const isTokenActive = async (sdkAuth: SdkAuth, token: Token) => {
  const tokenIntrospection = await sdkAuth.introspectToken(token.access_token);

  return tokenIntrospection.active;
};

const isTokenUserSession = (token: Token) =>
  token && (
    token.scope.includes('customer_id') ||
    token.scope.includes('anonymous_id')
  );

export { isTokenUserSession, isTokenActive };
