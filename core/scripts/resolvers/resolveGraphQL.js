import { server, graphql } from 'config'
import Vue from 'vue'
import { Logger } from '@vue-storefront/core/lib/logger'
import { once, isServer } from '@vue-storefront/core/helpers'

export const getApolloProvider = async () => {
  if (server.api === 'graphql') {
    const ApolloModule = await import(/* webpackChunkName: "vsf-graphql" */ 'vue-apollo')
    const VueApollo = ApolloModule.default

    once('__VUE_EXTEND_GQL__', () => {
      Vue.use(VueApollo)
    })

    const HttpLinkModule = await import(/* webpackChunkName: "vsf-graphql" */ 'apollo-link-http')
    const HttpLink = HttpLinkModule.HttpLink

    let uri
    if (isServer && (graphql.host_ssr || graphql.port_ssr)) {
      const host = graphql.host_ssr || graphql.host
      const port = graphql.port_ssr || graphql.port

      uri = host.indexOf('://') >= 0
        ? host
        : (server.protocol + '://' + host + ':' + port + '/graphql')
    } else {
      uri = graphql.host.indexOf('://') >= 0
        ? graphql.host
        : (server.protocol + '://' + graphql.host + ':' + graphql.port + '/graphql')
    }

    const httpLink = new HttpLink({
      uri
    })

    const ApolloClientModule = await import(/* webpackChunkName: "vsf-graphql" */ 'apollo-client')
    const ApolloClient = ApolloClientModule.default
    const inMemoryCacheModule = await import(/* webpackChunkName: "vsf-graphql" */ 'apollo-cache-inmemory')
    const InMemoryCache = inMemoryCacheModule.InMemoryCache

    const apolloClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: true
    })

    let loading = 0

    const apolloProvider = new VueApollo({
      clients: {
        a: apolloClient
      },
      defaultClient: apolloClient,
      defaultOptions: {
        // $loadingKey: 'loading',
      },
      watchLoading (state, mod) {
        loading += mod
        Logger.log('Global loading', loading, mod)()
      },
      errorHandler (error) {
        Logger.log('Global error handler')()
        Logger.error(error)()
      }
    })

    return apolloProvider
  } else return null
}

export default {
  getApolloProvider
}
