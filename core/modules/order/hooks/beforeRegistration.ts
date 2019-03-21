import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'

export function beforeRegistration({ Vue, config, store, isServer }) {
  Vue.prototype.$db.ordersCollection = new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'orders',
    driver: localForage[config.localForage.defaultDrivers['orders']]
  }))
}