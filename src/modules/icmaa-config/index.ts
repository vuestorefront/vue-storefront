import { coreHooks } from '@vue-storefront/core/hooks'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { ExtendedConfigStore } from './store'
import config from 'config'

import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

import { checkForIntlPolyfill } from './lib/intl'

export const cacheStorageKey = 'icmaa-config'
export const cacheStorage = StorageManager.init(cacheStorageKey, false)

export const IcmaaExtendedConfigModule: StorefrontModule = function ({ store }) {
  if (config.storeViews.multistore === true) {
    store.registerModule('icmaaConfig', ExtendedConfigStore)
    coreHooks.afterAppInit(() => {
      store.dispatch('icmaaConfig/setMap')
    })

    if (!isServer) {
      coreHooks.afterAppInit(async () => {
        const configStorage = StorageManager.get(cacheStorageKey)

        const storageBuildtime = await configStorage.getItem('buildtime')
        const envBuildtime = process.env.__BUILDTIME__

        if (!storageBuildtime || storageBuildtime !== envBuildtime) {
          Object.keys(StorageManager.storageMap).forEach(async key => {
            if (key.startsWith('icmaa-')) {
              Logger.debug('Flush localforage:', 'icmaa-config', key)()
              await StorageManager.get(key).clear()
            }
          })

          Logger.debug('Set build time:', 'icmaa-config', envBuildtime)()
          await configStorage.setItem('buildtime', envBuildtime)
        }
      })
    }

    if (isServer) {
      coreHooks.afterAppInit(async () => {
        await checkForIntlPolyfill()
      })
    }
  }
}
