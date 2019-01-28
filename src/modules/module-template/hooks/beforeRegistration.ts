// This function will be fired both on server and client side context before registering other parts of the module
export function beforeRegistration(Vue, config, store, isServer) {
  if (!Vue.prototype.$isServer) console.info('This will be called before extension registration and only on client side')
  store.dispatch('dataloader/push', { // this is an example showing how to call data loader from another module
    execute: (route, store, context) => {
      return new Promise ((resolve, reject) => {
        store.state.exampleDataFetchedByLoader = 'this is just example data fetched by loader'
        resolve(null)
      })
    }
  })
}