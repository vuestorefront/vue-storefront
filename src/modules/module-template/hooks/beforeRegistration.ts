import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'

// This function will be fired both on server and client side context before registering other parts of the module
export function beforeRegistration ({ Vue, config, store, isServer }) {
  if (!isServer) console.info('This will be called before extension registration and only on client side')
  AsyncDataLoader.push({ // this is an example showing how to call data loader from another module
    execute: ({ route, store, context }) => {
      return new Promise((resolve, reject) => {
        if (route.name === 'configurable-product') {
          store.state.exampleDataFetchedByLoader = 'this is just example data fetched by loader on configurable product page'
        } else {
          store.state.exampleDataFetchedByLoader = 'this is just example data fetched by loader on any page'
        }
        resolve(null)
      })
    }
  })
}
