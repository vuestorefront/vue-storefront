export function beforeRegistration(Vue, config) {
  if (!Vue.prototype.$isServer) console.info('This will be called before extension registration and only on client side')
}