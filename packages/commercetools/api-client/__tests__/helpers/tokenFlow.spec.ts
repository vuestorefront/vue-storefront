/* eslint-disable camelcase, @typescript-eslint/camelcase */
import createAccessToken from './../../src/helpers/createAccessToken';
import { setup } from './../../src/index';

const config = {
  api: {
    uri: 'https://example.com',
    authHost: 'https://example.com',
    projectKey: 'project-key',
    clientId: 'client-id',
    clientSecret: 'secret-id',
    scopes: []
  }
};

describe('[commercetools-api-client] tokenFlow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setup(config);
  });

  it('creates customer password flow', async () => {
    const token = await createAccessToken({ customerCredentials: { username: '', password: '' } });

    expect(token).toEqual('customer password flow');
  });

  it('creates anonymous flow', async () => {
    const token = await createAccessToken({ });

    expect(token).toEqual('anonymous flow');
  });

  it('creates refresh token flow', async () => {
    const currentToken = {
      expires_at: Date.now() - 100,
      refresh_token: 'current-refresh-token'
    } as any;
    const token = await createAccessToken({ currentToken });

    expect(token).toEqual('current-refresh-token');
  });

  it('returns current token', async () => {
    const currentToken = {
      access_token: 'current-token',
      expires_at: Date.now() + 100
    } as any;
    const token = await createAccessToken({ currentToken });

    expect(token.access_token).toEqual('current-token');
  });
});
