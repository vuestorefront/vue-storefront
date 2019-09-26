import { connect as websocket } from '../lib/websocket'
import { checkVersion } from '../lib/versioning'

export async function beforeRegistration ({ Vue, config, store, isServer }) {
  if (!isServer) {
    if (config.clearCache && config.clearCache.enabled) {
      if (config.clearCache.websocket.enabled) {
        websocket()
      }
      if (config.clearCache.version.enabled) {
        checkVersion()
      }
    }
  }
}
