import { orderStore } from './store'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/lib/store/storage'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import { Logger } from '@vue-storefront/core/lib/logger'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import { serial, onlineHelper, processURLAddress } from '@vue-storefront/core/helpers'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { isServer } from '@vue-storefront/core/helpers'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

export const OrderModule: StorefrontModule = function ({ store }) {
  StorageManager.init('orders')

  if (!isServer) {
    const orderMutex = {}
    // TODO: move to external file
    EventBus.$on('order/PROCESS_QUEUE', async event => {
      if (onlineHelper.isOnline) {
        Logger.log('Sending out orders queue to server ...')()
        const ordersCollection = StorageManager.get('orders')

        const fetchQueue = []
        ordersCollection.iterate((order, id) => {
          // Resulting key/value pair -- this callback
          // will be executed for every item in the
          // database.

          if (!order.transmited && !orderMutex[id]) { // not sent to the server yet
            orderMutex[id] = true
            const config = event.config
            const orderData = order
            const orderId = id
            Logger.log('Pushing out order ' + orderId)()
            fetchQueue.push(
              /** @todo refactor order synchronisation to proper handling through vuex actions to avoid code duplication */
              fetch(processURLAddress(config.orders.endpoint),
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(orderData)
                }).then(response => {
                const contentType = response.headers.get('content-type')
                if (contentType && contentType.includes('application/json')) {
                  return response.json()
                } else {
                  orderMutex[id] = false
                  Logger.error('Error with response - bad content-type!')()
                }
              })
                .then(jsonResponse => {
                  if (jsonResponse) {
                    Logger.info('Response for: ' + orderId + ' = ' + JSON.stringify(jsonResponse.result))()
                    orderData.transmited = true // by default don't retry to transmit this order
                    orderData.transmited_at = new Date()

                    if (jsonResponse.code !== 200) {
                      Logger.error(jsonResponse, 'order-sync')()

                      if (jsonResponse.code === 400) {
                        rootStore.dispatch('notification/spawnNotification', {
                          type: 'error',
                          message: i18n.t('Address provided in checkout contains invalid data. Please check if all required fields are filled in and also contact us on {email} to resolve this issue for future. Your order has been canceled.', { email: config.mailer.contactAddress }),
                          action1: { label: i18n.t('OK') }
                        })
                      } else if (jsonResponse.code === 500 && jsonResponse.result === i18n.t('Error: Error while adding products')) {
                        rootStore.dispatch('notification/spawnNotification', {
                          type: 'error',
                          message: i18n.t('Some products you\'ve ordered are out of stock. Your order has been canceled.'),
                          action1: { label: i18n.t('OK') }
                        })
                      } else {
                        orderData.transmited = false // probably some server related error. Enqueue
                      }
                    }

                    ordersCollection.setItem(orderId.toString(), orderData)
                  } else {
                    Logger.error(jsonResponse)()
                  }
                  orderMutex[id] = false
                }).catch(err => {
                  if (config.orders.offline_orders.notification.enabled) {
                    navigator.serviceWorker.ready.then(registration => {
                      registration.sync.register('orderSync')
                        .then(() => {
                          Logger.log('Order sync registered')()
                        })
                        .catch(error => {
                          Logger.log('Unable to sync', error)()
                        })
                    })
                  }
                  Logger.error('Error sending order: ' + orderId, err)()
                  orderMutex[id] = false
                })
            )
          }
        }, (err) => {
          if (err) Logger.error(err)()
          Logger.log('Iteration has completed')()

          // execute them serially
          serial(fetchQueue)
          Logger.info('Processing orders queue has finished')()
        }).catch(err => {
          // This code runs if there were any errors
          Logger.log(err)()
        })
      }
    })
  }
  store.registerModule('order', orderStore)
}
