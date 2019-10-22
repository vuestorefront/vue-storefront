import { Logger } from '@vue-storefront/core/lib/logger'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const CancelOrders = {
  methods: {
    cancelOrders () {
      const ordersCollection = StorageManager.get('orders')
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
