import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// Install the vue plugin
Vue.use(VueApollo)

// Create the apollo client
export function createApolloClient (ssr = false) {
  const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:4000/graphql'
  })

  const cache = new InMemoryCache()

  // If on the client, recover the injected state
  if (!ssr) {
    // If on the client, recover the injected state
    if (typeof window !== 'undefined') {
      const state = window.__APOLLO_STATE__
      if (state) {
        // If you have multiple clients, use `state.<client_id>`
        cache.restore(state.defaultClient)
      }
    }
  }

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: cache,
    connectToDevTools: true
  })

  return apolloClient
}