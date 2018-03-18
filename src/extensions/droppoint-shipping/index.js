const extensionStore = require('./store')
const extensionRoutes = require('./router')

const EXTENSION_KEY = 'droppoint-shipping'

module.exports = function (app, router, store, config) {
  console.log('Droppoint shipping extension registered')
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}
