import extensionStore from './store'
import extensionRoutes from './router'

const EXTENSION_KEY = 'droppoint-shipping'

export default function (app, router, store, config) {
  console.debug('Droppoint shipping extension registered')
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store

  return {EXTENSION_KEY, extensionRoutes, extensionStore}
}
