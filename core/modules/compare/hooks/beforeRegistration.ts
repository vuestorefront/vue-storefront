import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export function beforeRegistration({ Vue, config, store, isServer }) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  Vue.prototype.$db.compareCollection = new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'compare',
    driver: localForage[config.localForage.defaultDrivers['compare']]
  }))
}