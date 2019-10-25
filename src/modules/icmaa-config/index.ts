import { coreHooks } from '@vue-storefront/core/hooks'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { ExtendedConfigStore } from './store'
import config from 'config'

import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

export const cacheStorage = StorageManager.init('icmaa-config', false)

export const IcmaaExtendedConfigModule: StorefrontModule = function ({ store }) {
  if (config.storeViews.multistore === true) {
    store.registerModule('icmaaConfig', ExtendedConfigStore)
    coreHooks.afterAppInit(() => {
      store.dispatch('icmaaConfig/setMap')
    })

    if (!isServer) {
      coreHooks.afterAppInit(async () => {
        const configStorage = StorageManager.get('icmaa-config')

        const storageBuildtime = await configStorage.getItem('buildtime')
        const envBuildtime = process.env.__BUILDTIME__

        if (!storageBuildtime || storageBuildtime !== envBuildtime) {
          Object.keys(StorageManager.storageMap).forEach(async key => {
            if (key.startsWith('icmaa-')) {
              Logger.error('Flush localforage:', 'icmaa-config', key)()
              await StorageManager.get(key).clear()
            }
          })

          Logger.error('Set build time:', 'DEBUG', envBuildtime)()
          await configStorage.setItem('buildtime', envBuildtime)
        }
      })
    }
  }
}
