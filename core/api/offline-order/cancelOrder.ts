/**
 * Functionality for cancelling orders placed offline
 *
 * #### Methods
 * - **`cancelOrder()`** removes not transmitted orders from Local Storage
 *
 * Part of [Offline order API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import * as localForage from 'localforage'
import config from 'config'

import EventBus from '@vue-storefront/core/plugins/event-bus'
import UniversalStorage from '@vue-storefront/store/lib/storage'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'

export const cancelOrder = {
  methods: {
    cancelOrder () {
      const storeView = currentStoreView()
      const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

      const ordersCollection = new UniversalStorage(localForage.createInstance({
        name: dbNamePrefix + 'shop',
        storeName: 'orders',
        driver: localForage[config.localForage.defaultDrivers['orders']]
      }))

      ordersCollection.iterate((order, id, iterationNumber) => {
        if (!order.transmited) {
          ordersCollection.removeItem(id)
        }
      }).catch(err => {
        console.log(err)
        console.log('Not transmitted orders was deleted')
      })

      EventBus.$emit('modal-hide', 'modal-order-confirmation')
    }
  }
}
