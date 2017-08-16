const MODULE_KEY = 'custom_module'

import moduleStore from './store'
import moduleRoutes from './router'

export default function (app, router, store) {
  router.addRoutes(moduleRoutes) // add custom routes
  store.registerModule(MODULE_KEY, moduleStore) // add custom store
   // TODO: register module events here
  app.$on('application-after-init', () => {
    console.log('custom-event')
  })

  return { MODULE_KEY, moduleRoutes, moduleStore }
}
