import moduleRoutes from './router'
import { StorefrontModule } from '@vue-storefront/module';

const ampRendererStore = {
  namespaced: true,
  state: {
    key: null
  }
}

export const AmpRendererModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('amp-renderer', ampRendererStore)
  router.addRoutes(moduleRoutes)
}
