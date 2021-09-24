import { handleBeforeAuth, handleAfterAuth } from '../../src/links/authLinks';

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
      configuration: {},
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'customerSignMeIn' }
    });

    expect(result).toMatchObject({ access_token: 'ACCESS_TOKEN' });
  });

  it('generates access token for guest on anonymous-session allowed operations', async () => {
    const scope = '';
    const result = await handleBeforeAuth({
      configuration: {},
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'createCart' }
    });

    expect(result).toMatchObject({ access_token: 'GUEST_TOKEN' });
  });

  it('returns current token for anonymous user', async () => {
    const scope = 'anonymous_id';
    const result = await handleBeforeAuth({
      configuration: {},
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'customerSignMeIn' }
    });

    expect(result).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('returns current token for logged in user', async () => {
    const scope = 'customer_id';
    const result = await handleBeforeAuth({
      configuration: {},
      sdkAuth: getSdkAuth(scope),
      tokenProvider: getTokenProvider(scope),
      apolloReq: { operationName: 'customerSignMeIn' }
    });

    expect(result).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });
});

it('returns token from customToken handler', async () => {
  const token = {
    access_token: 'CUSTOM_TOKEN',
    scope: 'CUSTOM_SCOPE'
  };
  const customToken = jest.fn().mockImplementation(() => token);

  const result = await handleBeforeAuth({
    configuration: {
      customToken
    },
    sdkAuth: getSdkAuth(token.scope),
    tokenProvider: getTokenProvider(token.scope),
    apolloReq: { operationName: 'customerSignMeIn' }
  });

  expect(customToken).toBeCalled();
  expect(result).toMatchObject(token);
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
      response: { errors: [] }
    });

    expect(result).toMatchObject({ scope, access_token: 'LOGIN_TOKEN' });
    expect(sdkAuth.customerPasswordFlow).toBeCalledWith({ username: 'EMAIL', password: 'PASSWORD' });
  });
});
