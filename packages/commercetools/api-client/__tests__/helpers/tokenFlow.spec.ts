/* eslint-disable camelcase, @typescript-eslint/camelcase */
import createAccessTokenFlow from './../../src/helpers/createCommerceToolsLink/tokenFlow';

jest.mock('@commercetools/sdk-auth', () => jest.fn(() => ({
  anonymousFlow: () => Promise.resolve('anonymous flow'),
  customerPasswordFlow: () => Promise.resolve('customer password flow'),
  refreshTokenFlow: () => Promise.resolve('refresh token flow')
})));

const apiConfig = {
  authHost: 'localhost',
  projectKey: 'project-key',
  clientId: 'client-id',
  clientSecret: 'client-secret',
  scopes: []
};

describe('[commercetools-api-client] tokenFlow', () => {
  it('creates customer password flow', async () => {
    const token = await createAccessTokenFlow(apiConfig as any, { customerCredentials: { username: '',
      password: '' } });

    expect(token).toEqual('customer password flow');
  });

  it('creates anonymous flow', async () => {
    const token = await createAccessTokenFlow(apiConfig as any, { });

    expect(token).toEqual('anonymous flow');
  });

  it('creates refresh token flow', async () => {
    const currentToken = {
      expires_at: Date.now() - 100
    } as any;
    const token = await createAccessTokenFlow(apiConfig as any, { currentToken });

    expect(token).toEqual('refresh token flow');
  });

  it('returns current token', async () => {
    const currentToken = {
      access_token: 'current-token',
      expires_at: Date.now() + 100
    } as any;
    const token = await createAccessTokenFlow(apiConfig as any, { currentToken });

    expect(token.access_token).toEqual('current-token');
  });
});
