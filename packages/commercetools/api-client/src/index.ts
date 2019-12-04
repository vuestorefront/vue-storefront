import ApolloClient, { ApolloClientOptions } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApiConfig } from './types/setup'
import createCommerceToolsLink from './createCommerceToolsLink'
import getProduct from './getProduct'

let apolloClient: ApolloClient<any> = null

const setup = <TCacheShape>(config: ApiConfig, customOptions?: ApolloClientOptions<TCacheShape>): ApolloClient<TCacheShape> => {
  apolloClient = new ApolloClient({
    link: createCommerceToolsLink(config),
    cache: new InMemoryCache(),
    ...customOptions
  })

  return apolloClient
}

export { apolloClient, setup, getProduct }
