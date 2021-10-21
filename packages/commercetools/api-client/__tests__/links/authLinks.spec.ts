import { handleBeforeAuth, handleAfterAuth } from '../../src/links/authLinks';

let scope = '';

const getTokenProvider = () => ({
  setTokenInfo: jest.fn().mockImplementation(() => {}),
  getTokenInfo: jest.fn().mockImplementation(() => ({ scope, access_token: 'ACCESS_TOKEN' })),
  invalidateTokenInfo: jest.fn().mockImplementation(() => {})
});

jest.mock('../../src/links/sdkHelpers', () => ({
  createSdkHelpers: () => ({
    tokenProvider: getTokenProvider()
  })
}));

const auth = {
  onTokenChange: () => {},
  onTokenRead: () => '',
  onTokenRemove: () => {},
  onTokenProviderSet: () => {}
};

const configuration = {
  auth: auth
};

describe('[commercetools-helpers] handleBeforeAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates access token for guest session', async () => {
    const questTokenProvider = getTokenProvider();
    const { currentToken } = await handleBeforeAuth({
      configuration: { questTokenProvider, auth},
      apolloReq: { operationName: '' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('generates server access token for users related operations', async () => {
    const serverTokenProvider = getTokenProvider();
    const { currentToken } = await handleBeforeAuth({
      configuration: { serverTokenProvider, auth},
      apolloReq: { operationName: 'createReview' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('generates access token for guest on anonymous-session allowed operations', async () => {
    const { currentToken } = await handleBeforeAuth({
      configuration,
      apolloReq: { operationName: 'createCart' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('returns exiting token for users related operations', async () => {
    auth.onTokenRead = () => 'ACCESS_TOKEN';
    const { currentToken } = await handleBeforeAuth({
      configuration,
      apolloReq: { operationName: 'customerSignMeIn' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
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
      customToken,
      auth
    },
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
    const result = await handleAfterAuth({
      tokenProvider: getTokenProvider(),
      apolloReq: { operationName: 'createCart' },
      response: { errors: [] },
      configuration
    });

    expect(result).toMatchObject({ scope });
  });

  it('doesnt fetch access token for logged in user', async () => {
    scope = 'customer_id';
    const result = await handleAfterAuth({
      tokenProvider: getTokenProvider(),
      apolloReq: { operationName: 'customerSignMeIn' },
      response: { errors: [] },
      configuration
    });

    expect(result).toMatchObject({ scope });
  });

  it('fetches access token for anonymous session', async () => {
    scope = 'anonymous_id';
    const result = await handleAfterAuth({
      tokenProvider: getTokenProvider(),
      apolloReq: {
        operationName: 'customerSignMeIn',
        variables: { draft: { email: 'EMAIL', password: 'PASSWORD' } }
      },
      response: { errors: [] },
      configuration
    });

    expect(result).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('fetches access token for guest', async () => {
    const result = await handleAfterAuth({
      tokenProvider: getTokenProvider(),
      apolloReq: {
        operationName: 'customerSignMeIn',
        variables: { draft: { email: 'EMAIL', password: 'PASSWORD' } }
      },
      response: { errors: [] },
      configuration
    });

    expect(result).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });
});
