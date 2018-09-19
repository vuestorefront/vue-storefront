import * as localForage from 'localforage'
import config from 'config'

import EventBus from '@vue-storefront/core/plugins/event-bus'

import UniversalStorage from '@vue-storefront/store/lib/storage'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'

export function onNetworkStatusChange (store) {
  console.log('Are we online: ' + navigator.onLine)

  if (typeof navigator !== 'undefined' && navigator.onLine) {
    EventBus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue
    store.dispatch('cart/load')

    if (config.orders.offline_orders.automatic_transmission_enabled || store.getters['checkout/isThankYouPage']) {
      EventBus.$emit('order/PROCESS_QUEUE', { config: config }) // process checkout queue
      // store.dispatch('cart/serverPull', { forceClientState: false })
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
        console.error(err)
      })

      if (ordersToConfirm.length > 0) {
        EventBus.$emit('offline-order-confirmation', ordersToConfirm)
      }
    }
  }
}
