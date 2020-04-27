import Vue from 'vue'
import VueGtm from 'vue-gtm'

import { once, isServer } from '@vue-storefront/core/helpers'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { Logger } from '@vue-storefront/core/lib/logger'

import { googleTagManagerModule } from './store'
import { afterRegistration, isEnabled } from './hooks/afterRegistration'

export const KEY = 'google-tag-manager'

export const GoogleTagManagerModule: StorefrontModule = function ({ store, router, appConfig }) {
  if (isEnabled(appConfig.googleTagManager.id)) {
    once('__VUE_EXTEND_GTM__', () => {
      Vue.use(VueGtm, {
        enabled: true,
        id: appConfig.googleTagManager.id,
        debug: appConfig.googleTagManager.debug,
        vueRouter: router
      })
    })
  } else {
    Logger.warn('Google Tag Manager extensions is not working. Ensure Google Tag Manager container ID is defined in config', 'GTM')()
  }

  store.registerModule(KEY, googleTagManagerModule)

  afterRegistration(appConfig, store)
}
