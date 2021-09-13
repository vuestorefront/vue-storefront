import { createAuthHandlers } from '../../../src/helpers/commercetoolsLink/linkHandlers';

const getSdkAuth = () => ({
  anonymousFlow: jest.fn().mockImplementation(() => ({ access_token: 'GUEST_TOKEN' })),
  customerPasswordFlow: jest.fn().mockImplementation(() => ({ access_token: 'LOGIN_TOKEN' }))
});

const getTokenProvider = () => ({
  setTokenInfo: jest.fn().mockImplementation(() => {}),
  getTokenInfo: jest.fn().mockImplementation(() => ({ access_token: 'ACCESS_TOKEN' })),
  invalidateTokenInfo: jest.fn().mockImplementation(() => {})
});

jest.mock('./../../../src/helpers/commercetoolsLink/authHelpers', () => ({
  createAuthClient: () => getSdkAuth(),
  createTokenProvider: () => getTokenProvider()
}));

describe('[commercetools-helpers] token generation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates basic token', async () => {
    const { obtainBasicToken } = createAuthHandlers({ settings: {}, currentToken: '' });

    const token = await obtainBasicToken();

    expect(token).toEqual({ access_token: 'ACCESS_TOKEN' });
  });

  it('generates anonymous token', async () => {
    const { obtainAnonymousToken } = createAuthHandlers({ settings: {}, currentToken: '' });

    const token = await obtainAnonymousToken({ apolloReq: { operationName: 'test operation' } });

    expect(token).toEqual({ access_token: 'GUEST_TOKEN' });
  });

  it('generates user token', async () => {
    const { obtainUserToken } = createAuthHandlers({ settings: {}, currentToken: '' });

    const token = await obtainUserToken({
      response: {},
      apolloReq: {
        operationName: 'test operation',
        variables: {
          draft: { email: 'test@test.com', password: '123' }
        }
      }
    });

    expect(token).toEqual({ access_token: 'LOGIN_TOKEN' });
  });
});

