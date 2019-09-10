import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { googleTagManagerModule } from './store'

export const KEY = 'google-tag-manager'

export const GoogleTagManagerModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule(KEY, googleTagManagerModule)
}
