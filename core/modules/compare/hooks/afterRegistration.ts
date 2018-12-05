export function afterRegistration(Vue, config, store, isServer){
  if (!isServer) store.dispatch('compare/load')
}