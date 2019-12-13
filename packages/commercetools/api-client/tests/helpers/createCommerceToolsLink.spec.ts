import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import createCommerceToolsLink from './../../src/helpers/createCommerceToolsLink'

jest.unmock('./../../src/helpers/createCommerceToolsLink')
jest.mock('./../../src/helpers/createCommerceToolsLink/getAccessToken', () =>
  jest.fn().mockImplementation(() => 'access token')
)
jest.mock('apollo-link-http')
jest.mock('apollo-link-context')

describe('[commercetools-api-client] createCommerceToolsLink', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('builds an apollo link', async (done) => {
    const concat = jest.fn()
    // @ts-ignore
    setContext = jest.fn().mockImplementation((handler) => {
      handler(null, { headers: { test: 1 } }).then((res) => {
        expect(res).toEqual({ headers: { test: 1, authorization: 'Bearer access token' } })
        done()
      })

      return { concat }
    })

    createCommerceToolsLink({
      uri: '',
      authHost: '',
      projectKey: '',
      clientId: '',
      clientSecret: '',
      scopes: []
    })

    expect(createHttpLink).toBeCalled()
    expect(setContext).toBeCalled()
    expect(concat).toBeCalled()
  })

})
