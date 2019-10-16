// This function will be fired both on server and client side context after registering other parts of the module
export function afterRegistration ({ Vue, config, store, isServer }) {
  if (!isServer) store.dispatch('recently-viewed/load')
}
