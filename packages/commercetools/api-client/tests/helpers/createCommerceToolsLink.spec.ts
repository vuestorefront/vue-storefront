import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import createCommerceToolsLink from './../../src/helpers/createCommerceToolsLink'
import loadAccessToken from './../../src/helpers/createCommerceToolsLink/loadAccessToken'

jest.unmock('./../../src/helpers/createCommerceToolsLink')
jest.mock('./../../src/helpers/createCommerceToolsLink/loadAccessToken', () => jest.fn(() => 'access token'))
jest.mock('apollo-link-http')
jest.mock('apollo-link-context')
jest.mock('apollo-link')

describe('[commercetools-api-client] createCommerceToolsLink', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('builds an apollo link', async (done) => {
    (ApolloLink as any).mockImplementation((fn) => {
      const operation = { operationName: 'someOperation', variables: { draft: null } }

      fn(operation, op => [op])

    })

    // @ts-ignore
    setContext = jest.fn().mockImplementation((handler) => {
      handler(null, { headers: { test: 1 } }).then((res) => {
        expect(res).toEqual({ headers: { test: 1, authorization: 'Bearer access token' } })
        done()
      })
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
    expect(loadAccessToken).toBeCalledTimes(1)
  })

  it('builds link for logged user', (done) => {
    (ApolloLink as any).mockImplementation((fn) => {
      const operation = { operationName: 'customerSignMeIn', variables: { draft: { email: '', password: '' } } }

      fn(operation, op => [op])
    })

    // @ts-ignore
    setContext = jest.fn().mockImplementation((handler) => {
      handler(null, { headers: { test: 1 } }).then((res) => {
        expect(res).toEqual({ headers: { test: 1, authorization: 'Bearer access token' } })
        done()
      })
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
    expect(loadAccessToken).toBeCalledTimes(2)
  })


  it('builds link for registered user', (done) => {
    (ApolloLink as any).mockImplementation((fn) => {
      const operation = { operationName: 'customerSignMeUp', variables: { draft: { email: '', password: '' } } }

      fn(operation, op => [op])
    })

    // @ts-ignore
    setContext = jest.fn().mockImplementation((handler) => {
      handler(null, { headers: { test: 1 } }).then((res) => {
        expect(res).toEqual({ headers: { test: 1, authorization: 'Bearer access token' } })
        done()
      })
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
    expect(loadAccessToken).toBeCalledTimes(2)
  })
})
