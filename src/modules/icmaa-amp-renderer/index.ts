import moduleRoutes from './router'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import config from 'config'

const icmaaAmpRendererStore = {
  namespaced: true,
  state: {
    key: null
  }
}

export const IcmaaAmpRendererModule: StorefrontModule = function ({store, router}) {
  store.registerModule('icmaa-amp-renderer', icmaaAmpRendererStore)
  setupMultistoreRoutes(config, router, moduleRoutes, 10)
}
