export function afterRegistration(isServer, config, store) {
  if (isServer) store.dispatch('cart/load')
}