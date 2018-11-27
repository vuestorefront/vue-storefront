export function afterRegistration(isServer, config, store) {
  if (!isServer) store.dispatch('compare/load')
}