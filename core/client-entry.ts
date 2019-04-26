import Vue from 'vue'
import * as localForage from 'localforage'
import union from 'lodash-es/union'

import { createApp } from '@vue-storefront/core/app'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import rootStore from '@vue-storefront/core/store'

import buildTimeConfig from 'config'
import { execute } from '@vue-storefront/core/lib/sync/task'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import i18n from '@vue-storefront/i18n'
import { prepareStoreView, storeCodeFromRoute, currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import { onNetworkStatusChange } from '@vue-storefront/core/modules/offline-order/helpers/onNetworkStatusChange'
import '@vue-storefront/core/service-worker/registration' // register the service worker
import { AsyncDataLoader } from './lib/async-data-loader'
import { Logger } from '@vue-storefront/core/lib/logger'
declare var window: any

const invokeClientEntry = async () => {
  const config = Object.assign(buildTimeConfig, window.__INITIAL_STATE__.config ? window.__INITIAL_STATE__.config : buildTimeConfig)

  // Get storeCode from server (received either from cache header or env variable)
  let storeCode =  window.__INITIAL_STATE__.user.current_storecode
  const { app, router, store } = await createApp(null, config, storeCode)

  if (window.__INITIAL_STATE__) {
    store.replaceState(Object.assign({}, store.state, window.__INITIAL_STATE__, { config: buildTimeConfig }))
  }

  store.dispatch('url/registerDynamicRoutes')
  function _commonErrorHandler (err, reject) {
    if (err.message.indexOf('query returned empty result') > 0) {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('The product, category or CMS page is not available in Offline mode. Redirecting to Home.'),
        action1: { label: i18n.t('OK') }
      })
      router.push(localizedRoute('/', currentStoreView().storeCode))
    } else {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t(err.message),
        action1: { label: i18n.t('OK') }
      })
      reject()
    }
  }

  function _ssrHydrateSubcomponents (components, next, to) {
    Promise.all(components.map(SubComponent => {
      if (SubComponent.asyncData) {
        return SubComponent.asyncData({
          store,
          route: to
        })
      } else {
        return Promise.resolve(null)
      }
    })).then(() => {
      AsyncDataLoader.flush({ store, route: to, context: null }).then(next).catch(err => {
        _commonErrorHandler(err, next)
      })
    }).catch(err => {
      _commonErrorHandler(err, next)
    })
  }
  router.onReady(() => {
    router.beforeResolve((to, from, next) => {
      if (!from.name) return next() // do not resolve asyncData on server render - already been done
      if (Vue.prototype.$ssrRequestContext) Vue.prototype.$ssrRequestContext.output.cacheTags = new Set<string>()
      const matched = router.getMatchedComponents(to)
      const prevMatched = router.getMatchedComponents(from)
      if (to) { // this is from url
        if (config.storeViews.multistore === true) {
          const storeCode = storeCodeFromRoute(to)
          const currentStore = currentStoreView()
          if (storeCode !== '' && storeCode !== null) {
            if (storeCode !== currentStore.storeCode) {
              (document as any).location = to.path // full reload
            } else {
              prepareStoreView(storeCode)
            }
          }
        }
      }
      if (!matched.length) {
        return next()
      }
      Promise.all(matched.map((c: any) => { // TODO: update me for mixins support
        const components = c.mixins && config.ssr.executeMixedinAsyncData ? Array.from(c.mixins) : []
        union(components, [c]).map(SubComponent => {
          if (SubComponent.preAsyncData) {
            SubComponent.preAsyncData({ store, route: to })
          }
        })
        if (c.asyncData) {
          c.asyncData({ store, route: to }).then(result => { // always execute the asyncData() from the top most component first
            Logger.debug('Top-most asyncData executed')()
            _ssrHydrateSubcomponents(components, next, to)
          }).catch(next)
        } else {
          _ssrHydrateSubcomponents(components, next, to)
        }
      }))
    })
    app.$mount('#app')
  })
  /*
  * serial executes Promises sequentially.
  * @param {funcs} An array of funcs that return promises.
  * @example
  * const urls = ['/url1', '/url2', '/url3']
  * serial(urls.map(url => () => $.ajax(url)))
  *     .then(Logger.log.bind(Logger))()
  */
  const serial = funcs =>
    funcs.reduce((promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

  const orderMutex = {}
  // TODO: move to external file
  EventBus.$on('order/PROCESS_QUEUE', event => {
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      Logger.log('Sending out orders queue to server ...')()

      const storeView = currentStoreView()
      const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

      const ordersCollection = new UniversalStorage(localForage.createInstance({
        name: 'shop',
        storeName: 'orders',
        driver: localForage[config.localForage.defaultDrivers['orders']]
      }))

      const fetchQueue = []
      ordersCollection.iterate((order, id, iterationNumber) => {
        // Resulting key/value pair -- this callback
        // will be executed for every item in the
        // database.

        if (!order.transmited && !orderMutex[id]) { // not sent to the server yet
          orderMutex[id] = true
          fetchQueue.push(() => {
            const config = event.config
            const orderData = order
            const orderId = id

            Logger.log('Pushing out order ' + orderId)()
            /** @todo refactor order synchronisation to proper handling through vuex actions to avoid code duplication */
            return fetch(config.orders.endpoint,
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
          })
        }
      }, (err, result) => {
        if (err) Logger.error(err)()
        Logger.log('Iteration has completed')()

        // execute them serially
        serial(fetchQueue)
          .then(res => {
            Logger.info('Processing orders queue has finished')()
            // store.dispatch('cart/serverPull', { forceClientState: false })
          })
      }).catch(err => {
        // This code runs if there were any errors
        Logger.log(err)()
      })
    }
  })

  // Process the background tasks
  // todo rewrite and split across modules and move to task lib
  const mutex = {}
  EventBus.$on('sync/PROCESS_QUEUE', data => {
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      // event.data.config - configuration, endpoints etc
      const storeView = currentStoreView()
      const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

      const syncTaskCollection = new UniversalStorage(localForage.createInstance({
        name: dbNamePrefix + 'shop',
        storeName: 'syncTasks'
      }))

      const usersCollection = new UniversalStorage(localForage.createInstance({
        name: (config.storeViews.commonCache ? '' : dbNamePrefix) + 'shop',
        storeName: 'user',
        driver: localForage[config.localForage.defaultDrivers['user']]
      }))
      const cartsCollection = new UniversalStorage(localForage.createInstance({
        name: (config.storeViews.commonCache ? '' : dbNamePrefix) + 'shop',
        storeName: 'carts',
        driver: localForage[config.localForage.defaultDrivers['carts']]
      }))

      usersCollection.getItem('current-token', (err, currentToken) => { // TODO: if current token is null we should postpone the queue and force re-login - only if the task requires LOGIN!
        if (err) {
          Logger.error(err)()
        }
        cartsCollection.getItem('current-cart-token', (err, currentCartId) => {
          if (err) {
            Logger.error(err)()
          }

          if (!currentCartId && store.state.cart.cartServerToken) { // this is workaround; sometimes after page is loaded indexedb returns null despite the cart token is properly set
            currentCartId = store.state.cart.cartServerToken
          }

          if (!currentToken && store.state.user.token) { // this is workaround; sometimes after page is loaded indexedb returns null despite the cart token is properly set
            currentToken = store.state.user.token
          }
          const fetchQueue = []
          Logger.debug('Current User token = ' + currentToken)()
          Logger.debug('Current Cart token = ' + currentCartId)()
          syncTaskCollection.iterate((task, id, iterationNumber) => {
            if (task && !task.transmited && !mutex[id]) { // not sent to the server yet
              mutex[id] = true // mark this task as being processed
              fetchQueue.push(() => {
                return execute(task, currentToken, currentCartId).then(executedTask => {
                  syncTaskCollection.setItem(executedTask.task_id.toString(), executedTask)
                  mutex[id] = false
                }).catch(err => {
                  mutex[id] = false
                  Logger.error(err)()
                })
              })
            }
          }, (err, result) => {
            if (err) Logger.error(err)()
            Logger.debug('Iteration has completed')()
            // execute them serially
            serial(fetchQueue)
              .then(res => {
                Logger.debug('Processing sync tasks queue has finished')()
              })
          }).catch(err => {
            // This code runs if there were any errors
            Logger.log(err)()
          })
        })
      })
    }
  })

  window.addEventListener('online', () => { onNetworkStatusChange(store) })
}

invokeClientEntry()
