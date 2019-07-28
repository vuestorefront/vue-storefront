import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { IcmaaMetaStore } from './store'

export const IcmaaMetaModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('icmaaMeta', IcmaaMetaStore)
}
