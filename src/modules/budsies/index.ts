import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { module } from './store'

export const KEY = 'budsies'

export const BudsiesModule: StorefrontModule = function ({ store, router, appConfig }) {
  store.registerModule(KEY, module);
}
