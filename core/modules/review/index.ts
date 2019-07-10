import { StorefrontModule } from '@vue-storefront/module'
import { reviewStore } from './store'

const KEY = 'review'
export const ReviewModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule(KEY, reviewStore)
}
