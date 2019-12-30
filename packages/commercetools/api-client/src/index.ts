import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SetupConfig } from './types/setup'
import createCommerceToolsLink from './helpers/createCommerceToolsLink'
import getProduct from './api/getProduct'
import getCategory from './api/getCategory'

let apolloClient: ApolloClient<any> = null
let locale = 'en'
let currency = 'USD'

const setup = <TCacheShape>(setupConfig?: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  apolloClient = new ApolloClient({
    link: createCommerceToolsLink(setupConfig.api),
    cache: new InMemoryCache(),
    ...setupConfig.customOptions
  })
  locale = setupConfig.locale
  currency = setupConfig.currency

  return apolloClient
}

export { apolloClient, setup, locale, currency, getProduct, getCategory }
