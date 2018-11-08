export function afterRegistration(Vue, config, store) {
  if (!Vue.prototype.$isServer) store.dispatch('cart/load')
}