const EXTENSION_KEY = 'custom_extension'

import extensionStore from './store'
import extensionRoutes from './router'

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store
   // TODO: register module events here
  app.$on('application-after-init', () => {
    console.log('custom-event')
  })

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}
