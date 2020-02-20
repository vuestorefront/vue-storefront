/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { storeToken, getToken, cleanToken } from './../../src/helpers/createCommerceToolsLink/tokenCache';

jest.unmock('./../../src/helpers/createCommerceToolsLink/tokenCache');

describe('[commercetools-api-client] tokenCache', () => {
  it('returns null', () => {
    expect(getToken()).toEqual(null);
  });

  it('stores token', () => {
    const token = {
      access_token: 'token',
      expires_at: 111,
      expires_in: 222,
      scope: 'scope',
      token_type: 'token'
    };

    storeToken(token);

    expect(getToken()).toEqual(token);
  });

  it('clears token', () => {
    const token = {
      access_token: 'token',
      expires_at: 111,
      expires_in: 222,
      scope: 'scope',
      token_type: 'token'
    };

    storeToken(token);
    expect(getToken()).toEqual(token);
    cleanToken();
    expect(getToken()).toEqual(null);

  });
});
