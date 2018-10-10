import * as localForage from 'localforage'
import config from 'config'

import UniversalStorage from '@vue-storefront/store/lib/storage'

export const CancelOrders = {
  methods: {
    cancelOrders () {
      const ordersCollection = new UniversalStorage(localForage.createInstance({
        name: 'shop',
        storeName: 'orders',
        driver: localForage[config.localForage.defaultDrivers['orders']]
      }))

      ordersCollection.iterate((order, id, iterationNumber) => {
        if (!order.transmited) {
          ordersCollection.removeItem(id)
        }
      }).catch(err => {
        console.error(err)
        console.log('Not transmitted orders have been deleted')
      })
    }
  }
}
