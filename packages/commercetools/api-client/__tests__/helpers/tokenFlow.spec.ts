/* eslint-disable camelcase, @typescript-eslint/camelcase */
import * as sdk from '@commercetools/sdk-auth';
import createAccessToken from './../../src/helpers/createAccessToken';
import { setup } from './../../src/index';

const anonymousFlowMock = jest.fn(() => ({
  access_token: 'anonymous token',
  refresh_token: 'anonymous refresh token'
}));

const passwordFlowMock = jest.fn(() => ({
  access_token: 'user token',
  refresh_token: 'user refresh token'
}));

jest.spyOn(sdk, 'TokenProvider').mockImplementation((_, tokenInfo) => ({
  getTokenInfo: () => tokenInfo
}));
jest.spyOn(sdk, 'default').mockImplementation(() => ({
  anonymousFlow: anonymousFlowMock,
  customerPasswordFlow: passwordFlowMock
}));

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

  it('creates anonymous access token when there is no token  set', async () => {
    const token = await createAccessToken();

    expect(token).toEqual({
      access_token: 'anonymous token',
      refresh_token: 'anonymous refresh token'
    });
  });

  it('creates anonymous access token when token is invalid', async () => {
    const token1 = await createAccessToken({ currentToken: null } as any);
    const token2 = await createAccessToken({ currentToken: {} } as any);

    expect(token1).toEqual({
      access_token: 'anonymous token',
      refresh_token: 'anonymous refresh token'
    });
    expect(token2).toEqual({
      access_token: 'anonymous token',
      refresh_token: 'anonymous refresh token'
    });
  });

  it('return same token', async () => {
    const currentToken = {
      access_token: 'bbbbb',
      refresh_token: 'aaaa'
    };
    const token = await createAccessToken({ currentToken } as any);

    expect(token).toEqual(currentToken);
  });

  it('creates customer  token', async () => {
    const token = await createAccessToken({
      customerCredentials: {
        username: 'xxxx',
        password: 'xxxxx'
      }
    } as any);

    expect(token).toEqual({
      access_token: 'user token',
      refresh_token: 'user refresh token'
    });
  });

  it('returns same token as in the configuration', async () => {
    const currentToken = {
      access_token: 'current token',
      refresh_token: 'current refresh token'
    };
    setup({ ...config, currentToken } as any);

    const token = await createAccessToken();

    expect(token).toEqual(currentToken);
  });
});
