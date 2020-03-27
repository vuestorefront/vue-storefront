import Vue from 'vue'
import VueGtm from 'vue-gtm'

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { once } from '@vue-storefront/core/helpers'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { Logger } from '@vue-storefront/core/lib/logger'

import { icmaaGoogleTagManagerModule } from './store'
import { afterRegistration, isEnabled } from './hooks/afterRegistration'
import afterEach from './hooks/afterEach'

const initGTM = async ({ app, store, router, appConfig }) => {
  const { id, debug } = appConfig.googleTagManager
  const enabled = await isEnabled(appConfig.googleTagManager)
  if (enabled) {
    once('__VUE_EXTEND_GTM__', () => {
      Vue.use(VueGtm, { enabled, id, debug, vueRouter: router })
      store.dispatch('icmaaGoogleTagManager/enable', true)
    })

    /**
     * The `afterEach` router guard is only called if a "movement" happens between router.
     * When you call "/de" or home, for example, this event won't be called because the router is
     * resolved before the `client-entry.ts` initializes the module registration and therefore
     * there is no event yet bound to the Vue router instance.
     * But if there is a route which don't have a already solved route in the instance, VSF calles their
     * `RouterManager` in their `beforeEachGuard` to find a dynamic route using their actions and, if found,
     * push it to the Vue router – this is a router movement and calls our hooked `afterEach` event.
     *
     * To solve this, we could bind a `beforeEach` guard which first checks if this isn't already a
     * `url-dispatcher` route nor a it has a `from` route. If so, it calls our `afterEach` event once.
     * But, sadly, this module is registered after the first route is pushed so it won't be triggered either.
     *
     * Final solution: Set a state value if it's called initially and check for this after module registration.
     */
    if (!store.getters['icmaaGoogleTagManager/initiated']) {
      afterEach({ store, to: app.$route, from: {} })
      store.dispatch('icmaaGoogleTagManager/init')

      router.afterEach((to, from) => {
        if (from.name && !store.dispatch('icmaaGoogleTagManager/init')) {
          return
        }
        afterEach({ store, to, from })
      })
    }
  } else {
    Logger.log('Google Tag Manager extensions is not enabled', 'icmaa-gtm')()
  }
}

export const IcmaaGoogleTagManagerModule: StorefrontModule = async ({ app, store, router, appConfig }) => {
  store.registerModule('icmaaGoogleTagManager', icmaaGoogleTagManagerModule)

  await initGTM({ app, appConfig, router, store })
  EventBus.$on('cookiesAccepted', async (enabled: boolean) => {
    if (enabled) {
      Logger.log('Google Tag Manager extensions has been enabled', 'icmaa-gtm')()
      await initGTM({ app, appConfig, router, store })
    }
  })

  afterRegistration(appConfig, store)
}
