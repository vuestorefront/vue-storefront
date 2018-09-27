import extensionStore from './store'
import extensionRoutes from './router'

const EXTENSION_KEY = 'raw_content_extension'

export default function (app, router, store, config, serverContext) {
  serverContext.template = ''
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}
