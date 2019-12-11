import getAccessToken from 'api-client/src/helpers/createCommerceToolsLink/getAccessToken';
import { storeToken, getToken } from 'api-client/src/helpers/createCommerceToolsLink/tokenCache'

jest.mock('api-client/src/helpers/createCommerceToolsLink/tokenCache')
jest.mock('@commercetools/sdk-auth', () =>
  jest.fn().mockImplementation(() => ({
    clientCredentialsFlow: () => ({ access_token: 'generated access token' })
  }))
);

describe('[commercetools-api-client] getAccessToken', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches a new access token', async () => {
    const token = await getAccessToken({
      uri: '',
      authHost: '',
      projectKey: '',
      clientId: '',
      clientSecret: '',
      scopes: []
    });

    expect(getToken).toBeCalled()
    expect(storeToken).toBeCalled()
    expect(token).toBe('generated access token');
  })

  it('loads current access token', async () => {
    (getToken as any).mockImplementation(() => ({
      expires_at: Date.now() + 10000,
      access_token: 'current token'
    }))

    const token = await getAccessToken({
      uri: '',
      authHost: '',
      projectKey: '',
      clientId: '',
      clientSecret: '',
      scopes: []
    });

    expect(getToken).toBeCalled()
    expect(storeToken).not.toBeCalled()
    expect(token).toBe('current token');
  });
});
