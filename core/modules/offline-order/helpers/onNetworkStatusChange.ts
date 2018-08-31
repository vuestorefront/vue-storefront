import * as localForage from 'localforage'
import config from 'config'

import EventBus from '@vue-storefront/core/plugins/event-bus'

import UniversalStorage from '@vue-storefront/store/lib/storage'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'

export function onNetworkStatusChange (store) {
  console.log('Are we online: ' + navigator.onLine)

  if (typeof navigator !== 'undefined' && navigator.onLine) {
    if (config.orders.offline_orders.automatic_transmission_enabled || store.getters['checkout/isThankYouPage']) {
      EventBus.$emit('order/PROCESS_QUEUE', { config: config }) // process checkout queue
      EventBus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue
      // store.dispatch('cart/serverPull', { forceClientState: false })
      store.dispatch('cart/load')
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
        console.log(err)
      })

      if (ordersToConfirm.length > 0) {
        EventBus.$emit('offline-order-confirmation', ordersToConfirm)
      }
    }
  }
}
