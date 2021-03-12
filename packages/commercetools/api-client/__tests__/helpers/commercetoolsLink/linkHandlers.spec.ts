/* eslint-disable @typescript-eslint/camelcase, camelcase */
import { handleBeforeAuth, handleAfterAuth, handleRetry } from '../../../src/helpers/commercetoolsLink/linkHandlers';

const getSdkAuth = (scope) => ({
  anonymousFlow: jest.fn().mockImplementation(() => ({ scope, access_token: 'GUEST_TOKEN' })),
  customerPasswordFlow: jest.fn().mockImplementation(() => ({ scope, access_token: 'LOGIN_TOKEN' }))
});

const getTokenProvider = (scope) => ({
  setTokenInfo: jest.fn().mockImplementation(() => {}),
  getTokenInfo: jest.fn().mockImplementation(() => ({ scope, access_token: 'ACCESS_TOKEN' })),
  invalidateTokenInfo: jest.fn().mockImplementation(() => {})
});

describe('[commercetools-helpers] handleBeforeAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('doesnt generate access token for guest on users related operations', async () => {
    const scope = '';
    const result = await handleBeforeAuth({
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'customerSignMeIn' },
      currentToken: { scope }
    });

    expect(result).toMatchObject({ access_token: 'ACCESS_TOKEN' });
  });

  it('generates access token for guest on anonymous-session allowed operations', async () => {
    const scope = '';
    const result = await handleBeforeAuth({
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'createCart' },
      currentToken: { scope }
    });

    expect(result).toMatchObject({ access_token: 'GUEST_TOKEN' });
  });

  it('returns current token for anonymous user', async () => {
    const scope = 'anonymous_id';
    const result = await handleBeforeAuth({
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'customerSignMeIn' },
      currentToken: { scope }
    });

    expect(result).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('returns current token for logged in user', async () => {
    const scope = 'customer_id';
    const result = await handleBeforeAuth({
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'customerSignMeIn' },
      currentToken: { scope }
    });

    expect(result).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });
});

describe('[commercetools-helpers] handleAfterAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('doesnt fetch access token for non-user related operations', async () => {
    const scope = '';
    const result = await handleAfterAuth({
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'createCart' },
      currentToken: { scope },
      response: { errors: [] }
    });

    expect(result).toMatchObject({ scope });
  });

  it('doesnt fetch access token for logged in user', async () => {
    const scope = 'customer_id';
    const result = await handleAfterAuth({
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'customerSignMeIn' },
      currentToken: { scope },
      response: { errors: [] }
    });

    expect(result).toMatchObject({ scope });
  });

  it('fetches access token for anonymous session', async () => {
    const scope = 'anonymous_id';
    const sdkAuth = getSdkAuth(scope);
    const result = await handleAfterAuth({
      sdkAuth,
      tokenProvider: getTokenProvider(scope),
      apolloReq: {
        operationName: 'customerSignMeIn',
        variables: { draft: { email: 'EMAIL', password: 'PASSWORD' } }
      },
      currentToken: { scope },
      response: { errors: [] }
    });

    expect(result).toMatchObject({ scope, access_token: 'LOGIN_TOKEN' });
    expect(sdkAuth.customerPasswordFlow).toBeCalledWith({ username: 'EMAIL', password: 'PASSWORD' });
  });

  it('fetches access token for guest', async () => {
    const scope = '';
    const sdkAuth = getSdkAuth(scope);
    const result = await handleAfterAuth({
      sdkAuth,
      tokenProvider: getTokenProvider(scope),
      apolloReq: {
        operationName: 'customerSignMeIn',
        variables: { draft: { email: 'EMAIL', password: 'PASSWORD' } }
      },
      currentToken: { scope },
      response: { errors: [] }
    });

    expect(result).toMatchObject({ scope, access_token: 'LOGIN_TOKEN' });
    expect(sdkAuth.customerPasswordFlow).toBeCalledWith({ username: 'EMAIL', password: 'PASSWORD' });
  });
});

describe('[commercetools-helpers] handleRetry', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('defaults to false', () => {
    const tokenProvider = getTokenProvider('');
    const handler = handleRetry({ tokenProvider });
    const operation = { operationName: 'any' };
    const error = { result: { message: '' } };

    expect(handler(1, operation, error)).toBeFalsy();
    expect(tokenProvider.invalidateTokenInfo).not.toBeCalled();
  });

  it('doesnt run more than 3 times', () => {
    const tokenProvider = getTokenProvider('');
    const handler = handleRetry({ tokenProvider });
    const operation = { operationName: 'any' };
    const error = { result: { message: 'invalid_token' } };

    expect(handler(4, operation, error)).toBeFalsy();
    expect(tokenProvider.invalidateTokenInfo).not.toBeCalled();
  });

  it('calls "invalidateTokenInfo" on "invalid_token" error', () => {
    const tokenProvider = getTokenProvider('');
    const handler = handleRetry({ tokenProvider });
    const operation = { operationName: 'any' };
    const error = { result: { message: 'invalid_token' } };

    expect(handler(1, operation, error)).toBeTruthy();
    expect(tokenProvider.invalidateTokenInfo).toBeCalled();
  });
});
