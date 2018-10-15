export function afterRegistration(Vue, config) {
  if (!Vue.prototype.$isServer) console.info('This will be called after extension registration and only on client side')
}