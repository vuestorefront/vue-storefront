import { coreHooks } from '@vue-storefront/core/hooks'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { ExtendedConfigStore } from './store'
import config from 'config'

export const IcmaaExtendedConfigModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  if (config.storeViews.multistore === true) {
    store.registerModule('icmaaConfig', ExtendedConfigStore)
    coreHooks.afterAppInit(() => {
      store.dispatch('icmaaConfig/setMap')
    })
  }
}
