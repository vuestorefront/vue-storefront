import { StorefrontModule } from '@vue-storefront/module'
import { reviewStore } from './store'

export const ReviewModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('review', reviewStore)
}
