/* eslint-disable camelcase, @typescript-eslint/camelcase */
import loadAccessToken from './../../src/helpers/createCommerceToolsLink/loadAccessToken';
import { storeToken, getToken } from './../../src/helpers/createCommerceToolsLink/tokenCache';

jest.mock('./../../src/helpers/createCommerceToolsLink/tokenCache');
jest.mock('@commercetools/sdk-auth', () =>
  jest.fn().mockImplementation(() => ({
    anonymousFlow: () => ({ access_token: 'generated access token' })
  }))
);

describe('[commercetools-api-client] loadAccessToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches a new access token', async () => {
    const token = await loadAccessToken({
      uri: '',
      authHost: '',
      projectKey: '',
      clientId: '',
      clientSecret: '',
      scopes: []
    });

    expect(getToken).toBeCalled();
    expect(storeToken).toBeCalled();
    expect(token).toBe('generated access token');
  });

  it('loads current access token', async () => {
    (getToken as any).mockImplementation(() => ({
      expires_at: Date.now() + 10000,
      access_token: 'current token'
    }));

    const token = await loadAccessToken({
      uri: '',
      authHost: '',
      projectKey: '',
      clientId: '',
      clientSecret: '',
      scopes: []
    });

    expect(getToken).toBeCalled();
    expect(token).toBe('current token');
  });
});
