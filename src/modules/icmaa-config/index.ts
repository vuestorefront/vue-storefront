import Vue from 'vue'
import config from 'config'
import { coreHooks } from '@vue-storefront/core/hooks'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { ExtendedConfigStore } from './store'
import { once } from '@vue-storefront/core/helpers'

import { round, formatValue } from './helpers/price'

import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

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
          const whitelist = config.icmaa_config.localStorageBuildFlushWhitelist
          Object.keys(StorageManager.storageMap).forEach(async key => {
            if (whitelist.some(regexString => new RegExp(regexString).test(key))) {
              Logger.log('Flush localforage:', 'icmaa-config', key)()
              await StorageManager.get(key).clear()
            }
          })

          Logger.log('Set build time:', 'icmaa-config', envBuildtime)()
          await configStorage.setItem('buildtime', envBuildtime)
        }
      })
    }
  }

  once('__VUE_EXTEND__', () => {
    Vue.filter('round', round)
    Vue.filter('formatValue', formatValue)
  })
}
