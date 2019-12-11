import { storeToken, getToken } from 'api-client/src/helpers/createCommerceToolsLink/tokenCache'

describe('[commercetools-api-client] tokenCache', () => {
  it('returns null', () => {
    expect(getToken()).toEqual(null)
  })

  it('stores token', () => {
    const token = {
      access_token: 'token',
      expires_at: 111,
      expires_in: 222,
      scope: 'scope',
      token_type: 'token'
    }

    storeToken(token)

    expect(getToken()).toEqual(token)
  })
})
