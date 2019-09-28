import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { isServer } from '@vue-storefront/core/helpers'
import { ClearCacheStore } from './store'
import { connect as websocket } from './lib/websocket'
import { checkVersion } from './lib/versioning'

export const ClearCache: StorefrontModule = function ({store}) {
  store.registerModule('clear-cache', ClearCacheStore)

  if (!isServer) {
    if (store.state.config.clearCache && store.state.config.clearCache.enabled) {
      if (store.state.config.clearCache.websocket.enabled) {
        websocket()
      }
      if (store.state.config.clearCache.version.enabled) {
        checkVersion()
      }
    }
  }
}
