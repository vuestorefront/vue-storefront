import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig, extendModule } from '@vue-storefront/core/lib/module'
import { afterEach } from './router/afterEach'
import { beforeEach } from './router/beforeEach'

// Overriding wishlist
import mutations from './wishlist/mutations'

export const KEY = 'facebook-pixel'
export const WS_KEY = 'wishlist'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration,
  router: { afterEach, beforeEach }
}

export const FacebookPixel = new VueStorefrontModule(moduleConfig)

const wishlistExtend = {
  key: WS_KEY,
  store: { modules: [{ key: WS_KEY, module: {
    mutations
  }}] }
}

extendModule(wishlistExtend)