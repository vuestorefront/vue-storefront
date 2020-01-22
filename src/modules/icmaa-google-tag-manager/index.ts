import Vue from 'vue'
import VueGtm from 'vue-gtm'

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { once } from '@vue-storefront/core/helpers'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { Logger } from '@vue-storefront/core/lib/logger'

import { icmaaGoogleTagManagerModule } from './store'
import { afterRegistration, isEnabled } from './hooks/afterRegistration'

import { currentStoreView } from '@vue-storefront/core/lib/multistore'

const initGTM = async ({ store, router, appConfig }) => {
  const { id, debug } = appConfig.googleTagManager
  const enabled = await isEnabled(id)
  if (enabled) {
    once('__VUE_EXTEND_GTM__', () => {
      Vue.use(VueGtm, { enabled, id, debug, vueRouter: router })
    })

    router.afterEach((to, from) => {
      const name = to.meta.gtm || to.name
      const storeView = currentStoreView()
      let dataLayer = (window['dataLayer'] = window['dataLayer'] || [])
      dataLayer.push({
        'event': 'icmaa-content-view',
        'content-name': to.fullPath,
        'content-view-name': name,
        'store_code': storeView.storeCode,
        'customerLoggedIn': store.getters['user/isLoggedIn'],
        'customerEmail': store.getters['user/getUserEmail']
      })
    })

    store.dispatch('icmaaGoogleTagManager/enable', true)
  } else {
    Logger.log('Google Tag Manager extensions is not enabled', 'icmaa-gtm')()
  }
}

export const IcmaaGoogleTagManagerModule: StorefrontModule = async ({store, router, appConfig}) => {
  store.registerModule('icmaaGoogleTagManager', icmaaGoogleTagManagerModule)

  initGTM({ appConfig, router, store })
  EventBus.$on('cookiesAccepted', async (enabled: boolean) => {
    if (enabled) {
      Logger.log('Google Tag Manager extensions has been enabled', 'icmaa-gtm')()
      await initGTM({ appConfig, router, store })
    }
  })

  afterRegistration(appConfig, store)
}
