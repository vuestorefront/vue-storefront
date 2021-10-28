import { handleBeforeAuth, handleAfterAuth } from '../../src/links/authLinks';
import * as sdkHelpers from '../../src/links/sdkHelpers';

const getTokenProvider = (scope) => ({
  setTokenInfo: jest.fn().mockImplementation(() => {}),
  getTokenInfo: jest.fn().mockImplementation(() => ({ scope, access_token: 'ACCESS_TOKEN' })),
  invalidateTokenInfo: jest.fn().mockImplementation(() => {})
});

const auth = {
  onTokenChange: () => {},
  onTokenRead: () => {},
  onTokenRemove: () => {},
  setTokenProvider: () => {},
  getTokenProvider: jest.fn()
};

const configuration = {
  auth: auth
};

const api: any = {
  authHost: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'vsf-generic-ent-demo',
  clientId: 'w3HqE0p55rhxCWinIjFiq26L',
  clientSecret: '8ThyrROTeD73Uc9rzfiwSgNpVIku8bOE',
  scopes: [
    'create_anonymous_token:vsf-generic-ent-demo',
    'view_categories:vsf-generic-ent-demo',
    'view_published_products:vsf-generic-ent-demo',
    'view_stores:vsf-generic-ent-demo',
    'manage_my_profile:vsf-generic-ent-demo',
    'manage_my_orders:vsf-generic-ent-demo',
    'manage_my_payments:vsf-generic-ent-demo',
    'manage_my_shopping_lists:vsf-generic-ent-demo'
  ]
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

    expect(currentToken).toMatchObject({access_token: 'ACCESS_TOKEN' });
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
    const spyCreateSdkHelpers = jest.spyOn(sdkHelpers, 'createSdkHelpers');
    spyCreateSdkHelpers.mockReturnValue({ sdkAuth: null, tokenProvider: getTokenProvider(scope)});
    const currentToken = await handleBeforeAuth({
      configuration,
      apolloReq: { operationName: 'createCart' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('returns existing token for anonymous user', async () => {
    const scope = 'anonymous_id';
    auth.onTokenRead = () => 'ACCESS_TOKEN';
    const spyCreateSdkHelpers = jest.spyOn(sdkHelpers, 'createSdkHelpers');
    spyCreateSdkHelpers.mockReturnValue({ sdkAuth: null, tokenProvider: getTokenProvider(scope)});
    const currentToken = await handleBeforeAuth({
      configuration,
      apolloReq: { operationName: 'customerSignMeIn' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('returns existing token for logged in user', async () => {
    const scope = 'customer_id';
    auth.onTokenRead = () => 'ACCESS_TOKEN';
    const spyCreateSdkHelpers = jest.spyOn(sdkHelpers, 'createSdkHelpers');
    spyCreateSdkHelpers.mockReturnValue({ sdkAuth: null, tokenProvider: getTokenProvider(scope)});
    const currentToken = await handleBeforeAuth({
      configuration,
      apolloReq: { operationName: 'customerSignMeIn' }
    });

    expect(currentToken).toMatchObject({ scope, access_token: 'ACCESS_TOKEN' });
  });

  it('fetches new access token when user session is expired', async () => {
    const scope = 'customer_id';
    const expiredToken = {
      access_token: 'om9UleqfwtjDCP6jg4hF9iCm69mxlXO3',
      expires_in: 172800,
      token_type: 'Bearer',
      scope: 'view_categories:vsf-generic-ent-demo customer_id:26b9772d-0d22-4e5c-8fc3-bbc7a668ab86 manage_my_profile:vsf-generic-ent-demo manage_my_orders:vsf-generic-ent-demo view_published_products:vsf-generic-ent-demo create_anonymous_token:vsf-generic-ent-demo manage_my_payments:vsf-generic-ent-demo manage_my_shopping_lists:vsf-generic-ent-demo view_stores:vsf-generic-ent-demo',
      refresh_token: 'vsf-generic-ent-demo:WPyhTfXtyl-R3DwDLT3LausqJKIejsQTOvNYDV8l9m4',
      expires_at: 1666267200
    };

    auth.onTokenRead = () => expiredToken;
    jest.spyOn(sdkHelpers, 'createSdkHelpers').mockRestore();

    const currentToken = await handleBeforeAuth({
      configuration: { api, auth },
      apolloReq: { operationName: 'customerSignMeIn' }
    });

    const { scope: currentTokenScope } = currentToken;
    expect(currentToken.access_token).not.toBe(expiredToken.access_token);
    expect(currentTokenScope).toContain(scope);
  });

  it('fetches new access token when anonymous session is expired', async () => {
    const scope = 'anonymous_id';
    const expiredToken = {
      access_token: 'ikKnHpgRHA5JEglaF2hedIqq9sKZ8s0h',
      expires_in: 10800,
      token_type: 'Bearer',
      scope: 'manage_my_profile:vsf-generic-ent-demo manage_my_orders:vsf-generic-ent-demo view_published_products:vsf-generic-ent-demo create_anonymous_token:vsf-generic-ent-demo view_categories:vsf-generic-ent-demo anonymous_id:c17fa5a2-8f1a-4152-a07a-13e842f12855 manage_my_payments:vsf-generic-ent-demo manage_my_shopping_lists:vsf-generic-ent-demo view_stores:vsf-generic-ent-demo',
      refresh_token: 'vsf-generic-ent-demo:XwbYnoyVaeMjcEG31SfOiaUJLjDTNi_j37qy29eQrEk',
      expires_at: 1666267200
    };

    auth.onTokenRead = () => expiredToken;
    jest.spyOn(sdkHelpers, 'createSdkHelpers').mockRestore();

    const currentToken = await handleBeforeAuth({
      configuration: { api, auth },
      apolloReq: { operationName: 'customerSignMeIn' }
    });

    const { scope: currentTokenScope } = currentToken;
    expect(currentToken.access_token).not.toBe(expiredToken.access_token);
    expect(currentTokenScope).toContain(scope);
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
    const spyCreateSdkHelpers = jest.spyOn(sdkHelpers, 'createSdkHelpers');
    spyCreateSdkHelpers.mockReturnValue({ sdkAuth: null, tokenProvider: getTokenProvider(scope)});
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
    const spyCreateSdkHelpers = jest.spyOn(sdkHelpers, 'createSdkHelpers');
    spyCreateSdkHelpers.mockReturnValue({ sdkAuth: null, tokenProvider: getTokenProvider(scope)});
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
