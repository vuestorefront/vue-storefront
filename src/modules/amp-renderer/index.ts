import moduleRoutes from './router'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import config from 'config'

const ampRendererStore = {
  namespaced: true,
  state: {
    key: null
  }
}

export const AmpRendererModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('amp-renderer', ampRendererStore)
  setupMultistoreRoutes(config, router, moduleRoutes)
  RouterManager.addRoutes(moduleRoutes)
}
