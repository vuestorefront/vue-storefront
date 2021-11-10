import { handleBeforeAuth, handleAfterAuth } from '../../src/links/authLinks';
import { createSdkHelpers } from '../../src/links/sdkHelpers';

const getTokenProvider = (scope) => ({
  setTokenInfo: jest.fn().mockImplementation(() => {}),
  getTokenInfo: jest.fn().mockImplementation(() => ({ scope, access_token: 'ACCESS_TOKEN' })),
  invalidateTokenInfo: jest.fn().mockImplementation(() => {})
});

jest.mock('../../src/links/sdkHelpers', () => ({
  createSdkHelpers: jest.fn()
}));

const auth = {
  onTokenChange: () => {},
  onTokenRead: () => '',
  onTokenRemove: () => {},
  setTokenProvider: () => {},
  getTokenProvider: jest.fn()
};

const configuration = {
  auth: auth
};

describe('[commercetools-helpers] handleBeforeAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates access token for guest session', async () => {
    const scope = '';
    const guestTokenProvider = getTokenProvider(scope);
    const currentToken = await handleBeforeAuth({
      configuration: { guestTokenProvider, auth},
      apolloReq: { operationName: '' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('generates server access token for users related operations', async () => {
    const scope = '';
    const serverTokenProvider = getTokenProvider(scope);
    const currentToken = await handleBeforeAuth({
      configuration: { serverTokenProvider, auth},
      apolloReq: { operationName: 'createReview' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('generates access token for guest on anonymous-session allowed operations', async () => {
    const scope = '';
    const createSdkHelpersMock = createSdkHelpers as jest.Mock;
    createSdkHelpersMock.mockImplementation(() => ({ tokenProvider: getTokenProvider(scope)}));
    const currentToken = await handleBeforeAuth({
      configuration,
      apolloReq: { operationName: 'createCart' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('returns existing token for anonymous user', async () => {
    const scope = 'anonymous_id';
    auth.onTokenRead = () => 'ACCESS_TOKEN';
    const createSdkHelpersMock = createSdkHelpers as jest.Mock;
    createSdkHelpersMock.mockImplementation(() => ({ tokenProvider: getTokenProvider(scope)}));
    const currentToken = await handleBeforeAuth({
      configuration,
      apolloReq: { operationName: 'customerSignMeIn' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('returns existing token for logged in user', async () => {
    const scope = 'customer_id';
    auth.onTokenRead = () => 'ACCESS_TOKEN';
    const createSdkHelpersMock = createSdkHelpers as jest.Mock;
    createSdkHelpersMock.mockImplementation(() => ({ tokenProvider: getTokenProvider(scope)}));
    const currentToken = await handleBeforeAuth({
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
    const scope = '';
    auth.getTokenProvider = jest.fn().mockImplementation(() => getTokenProvider(scope));
    const result = await handleAfterAuth({
      apolloReq: { operationName: 'createCart' },
      response: { errors: [] },
      configuration
    });

    expect(result).toMatchObject({ scope });
  });

  it('doesnt fetch access token for logged in user', async () => {
    const scope = 'customer_id';
    auth.getTokenProvider = jest.fn().mockImplementation(() => getTokenProvider(scope));
    const result = await handleAfterAuth({
      apolloReq: { operationName: 'customerSignMeIn' },
      response: { errors: [] },
      configuration
    });

    expect(result).toMatchObject({ scope });
  });

  it('fetches access token for anonymous session', async () => {
    const scope = 'anonymous_id';
    const tokenProvider = getTokenProvider(scope);
    auth.getTokenProvider = jest.fn().mockImplementation(() => tokenProvider);
    const createSdkHelpersMock = createSdkHelpers as jest.Mock;
    createSdkHelpersMock.mockImplementation(() => ({ tokenProvider: tokenProvider }));
    const result = await handleAfterAuth({
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
    const scope = '';
    const tokenProvider = getTokenProvider(scope);
    auth.getTokenProvider = jest.fn().mockImplementation(() => tokenProvider);
    const createSdkHelpersMock = createSdkHelpers as jest.Mock;
    createSdkHelpersMock.mockImplementation(() => ({ tokenProvider: tokenProvider}));
    const result = await handleAfterAuth({
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
