import * as localForage from 'localforage'
import store from '@vue-storefront/core/store'

import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const CancelOrders = {
  methods: {
    cancelOrders () {
      const ordersCollection = initCacheStorage('orders', false, true)
      ordersCollection.iterate((order, id, iterationNumber) => {
        if (!order.transmited) {
          ordersCollection.removeItem(id)
        }
      }).catch(err => {
        Logger.error(err, 'offline-order')()
        Logger.log('Not transmitted orders have been deleted', 'offline-order')()
      })
    }
  }
}
