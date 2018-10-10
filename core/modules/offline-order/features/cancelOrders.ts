/**
 * Functionality for cancelling orders placed offline
 *
 * #### Methods
 * - **`cancelOrders()`** removes not transmitted orders from Local Storage
 *
 * Part of [Offline order API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import * as localForage from 'localforage'
import config from 'config'

import UniversalStorage from '@vue-storefront/store/lib/storage'

export const cancelOrders = {
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

      this.$bus.$emit('modal-hide', 'modal-order-confirmation')
    }
  }
}
