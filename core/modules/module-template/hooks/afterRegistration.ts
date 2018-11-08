// This function will be fired both on server and client side context after registering other parts of the module
export function afterRegistration(Vue, config, store) {
  if (!Vue.prototype.$isServer) console.info('This will be called after extension registration and only on client side')
}