import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SetupConfig } from './types/setup'
import createCommerceToolsLink from './helpers/createCommerceToolsLink'
import getProduct from './api/getProduct'

let apolloClient: ApolloClient<any> = null

const setup = <TCacheShape>(setupConfig?: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  if (process.env.APP_ENV === 'test') {
    const path = require('path')
    const createTestApolloClient = require(
      path.resolve(__dirname + './../tests/createTestApolloClient')
    ).default
    apolloClient = createTestApolloClient()

    return apolloClient
  }

  apolloClient = new ApolloClient({
    link: createCommerceToolsLink(setupConfig.config),
    cache: new InMemoryCache(),
    ...setupConfig.customOptions
  })

  return apolloClient
}

export { apolloClient, setup, getProduct }
