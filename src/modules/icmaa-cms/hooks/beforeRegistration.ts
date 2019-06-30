import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { KEY } from '../'

export function beforeRegistration ({ Vue, config, store, isServer }) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  Vue.prototype.$db[KEY] = new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: KEY,
    driver: localForage['LOCALSTORAGE']
  }))
}
