import moduleRoutes from './router'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import config from 'config'

const ampRendererStore = {
  namespaced: true,
  state: {
    key: null
  }
}

export const AmpRendererModule: StorefrontModule = function ({ store, router }) {
  store.registerModule('amp-renderer', ampRendererStore)
  setupMultistoreRoutes(config, router, moduleRoutes, 10)
}
