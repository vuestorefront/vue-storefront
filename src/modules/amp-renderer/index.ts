import moduleRoutes from './router'
import { StorefrontModule } from '@vue-storefront/module';

const ampRendererStore = {
  namespaced: true,
  state: {
    key: null
  }
}

const KEY = 'amp-renderer'
export const AmpRendererModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule(KEY, ampRendererStore)
  router.addRoutes(moduleRoutes)
}
