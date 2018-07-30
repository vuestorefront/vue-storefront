import extensionStore from './store'
import extensionRoutes from './router'
import Vue from 'vue'
// import App from 'theme/App'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const EXTENSION_KEY = 'phoenix-apollo'

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store
  console.log('Phoenix-Apollo extension registered')

  const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:3000/graphql'
  })

  // Create the apollo client
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
      console.log('Global loading', loading, mod)
    },
    errorHandler (error) {
      console.log('Global error handler')
      console.error(error)
    }
  })

  // Vue.use(apolloProvider)

  // Install the vue plugin
  // Vue.use(VueApollo)
  // With the apollo client instance
  Vue.use(VueApollo, {
    provide: apolloProvider.provide()
  })

  // Vue.set(app, 'provide', apolloProvider.provide())

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}
