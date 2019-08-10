import * as localForage from 'localforage'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'

export function onNetworkStatusChange (store) {
  Logger.log('Are we online: ' + navigator.onLine, 'offline-order')()

  if (typeof navigator !== 'undefined' && navigator.onLine) {
    EventBus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue
    store.dispatch('cart/load', { forceClientState: true })
    if (config.orders.offline_orders.automatic_transmission_enabled || store.getters['checkout/isThankYouPage']) {
      EventBus.$emit('order/PROCESS_QUEUE', { config: config }) // process checkout queue
    } else {
      const ordersToConfirm = []
      const storeView = currentStoreView()
      const ordersCollection = new UniversalStorage(localForage.createInstance({
        name: 'shop',
        storeName: 'orders',
        driver: localForage[config.localForage.defaultDrivers['orders']]
      }))

      ordersCollection.iterate((order, id, iterationNumber) => {
        if (!order.transmited) {
          ordersToConfirm.push(order)
        }
      }).catch(err => {
        Logger.error(err, 'offline-order')()
      })

      if (ordersToConfirm.length > 0) {
        EventBus.$emit('offline-order-confirmation', ordersToConfirm)
      }
    }
  }
}
