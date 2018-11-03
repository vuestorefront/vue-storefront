// This function will be fired both on server and client side context before registering other parts of the module
export function beforeRegistration(Vue, config, store) {
  if (!Vue.prototype.$isServer) console.info('This will be called before extension registration and only on client side')
}