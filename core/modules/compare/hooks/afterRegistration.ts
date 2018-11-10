export function afterRegistration(Vue, config, store) {
  if (!Vue.prototype.$isServer) store.dispatch('compare/load')
}