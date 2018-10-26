import Vue from 'vue'
import * as localForage from 'localforage'
import { union } from 'lodash-es'

import { createApp } from '@vue-storefront/core/app'
import EventBus from '@vue-storefront/core/plugins/event-bus'

import buildTimeConfig from 'config'
import { execute } from '@vue-storefront/store/lib/task'
import UniversalStorage from '@vue-storefront/store/lib/storage'
import i18n from '@vue-storefront/i18n'
import { prepareStoreView, storeCodeFromRoute, currentStoreView } from '@vue-storefront/store/lib/multistore'
import { onNetworkStatusChange } from '@vue-storefront/core/modules/offline-order/helpers/onNetworkStatusChange'

require('@vue-storefront/core/service-worker-registration') // register the service worker

declare var window: any

const config = Object.assign(buildTimeConfig, window.__INITIAL_STATE__.config ? window.__INITIAL_STATE__.config : buildTimeConfig)
const { app, router, store } = createApp(null, config)

let storeCode = null // select the storeView by prefetched vuex store state (prefetched serverside)
if (window.__INITIAL_STATE__) {
  store.replaceState(Object.assign({}, store.state, window.__INITIAL_STATE__, { config: buildTimeConfig }))
}
if (config.storeViews.multistore === true) {
  if ((storeCode = store.state.user.current_storecode)) {
    prepareStoreView(storeCode)
  }
}

function _commonErrorHandler (err, reject) {
  if (err.message.indexOf('query returned empty result') > 0) {
    EventBus.$emit('notification', {
      type: 'error',
      message: i18n.t('No available product variants'),
      action1: { label: i18n.t('OK'), action: 'close' }
    })
    router.back()
  } else {
    EventBus.$emit('notification', {
      type: 'error',
      message: i18n.t(err.message),
      action1: { label: i18n.t('OK'), action: 'close' }
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
    next()
  }).catch(err => {
    _commonErrorHandler(err, next)
  })
}
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    if (Vue.prototype.$ssrRequestContext) Vue.prototype.$ssrRequestContext.output.cacheTags = new Set<string>()
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    if (to) { // this is from url
      if (config.storeViews.multistore === true) {
        const storeCode = storeCodeFromRoute(to)
        const currentStore = currentStoreView()
        if (storeCode !== '' && storeCode !== null) {
          if (storeCode !== currentStore.storeCode) {
            document.location = to.path // full reload
          } else {
            prepareStoreView(storeCode)
          }
        }
      }
    }
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    Promise.all(activated.map(c => { // TODO: update me for mixins support
      const components = c.mixins && config.ssr.executeMixedinAsyncData ? Array.from(c.mixins) : []
      union(components, [c]).map(SubComponent => {
        if (SubComponent.preAsyncData) {
          SubComponent.preAsyncData({ store, route: to })
        }
      })
      if (c.asyncData) {
        c.asyncData({ store, route: to }).then(result => { // always execute the asyncData() from the top most component first
          console.debug('Top-most asyncData executed')
          _ssrHydrateSubcomponents(components, next, to)
        }).catch(next)
      } else {
        _ssrHydrateSubcomponents(components, next, to)
      }
    }))
  })
  app.$mount('#app')
})
// TODO: Move the order queue here from service worker!
/*
 * serial executes Promises sequentially.
 * @param {funcs} An array of funcs that return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 */
const serial = funcs =>
  funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

const orderMutex = {}
// TODO: move to external file
EventBus.$on('order/PROCESS_QUEUE', event => {
  if (typeof navigator !== 'undefined' && navigator.onLine) {
    console.log('Sending out orders queue to server ...')

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

          console.log('Pushing out order ' + orderId)
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
              console.error('Error with response - bad content-type!')
            }
          })
            .then(jsonResponse => {
              if (jsonResponse && jsonResponse.code === 200) {
                console.info('Response for: ' + orderId + ' = ' + jsonResponse.result)
                orderData.transmited = true
                orderData.transmited_at = new Date()
                ordersCollection.setItem(orderId.toString(), orderData)
              } else {
                console.error(jsonResponse)
              }
              orderMutex[id] = false
            }).catch(err => {
              if (config.orders.offline_orders.notification.enabled) {
                navigator.serviceWorker.ready.then(registration => {
                  registration.sync.register('orderSync')
                    .then(() => {
                      console.log('Order sync registered')
                    })
                    .catch(error => {
                      console.log('Unable to sync', error)
                    })
                })
              }
              console.error('Error sending order: ' + orderId, err)
              orderMutex[id] = false
            })
        })
      }
    }, (err, result) => {
      if (err) console.error(err)
      console.log('Iteration has completed')

      // execute them serially
      serial(fetchQueue)
        .then(res => {
          console.info('Processing orders queue has finished')
          // store.dispatch('cart/serverPull', { forceClientState: false })
        })
    }).catch(err => {
      // This code runs if there were any errors
      console.log(err)
    })
  }
})

// Process the background tasks
const mutex = {}
EventBus.$on('sync/PROCESS_QUEUE', data => {
  if (typeof navigator !== 'undefined' && navigator.onLine) {
    console.log('Executing task queue')
    // event.data.config - configuration, endpoints etc
    const storeView = currentStoreView()
    const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

    const syncTaskCollection = new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'syncTasks'
    }))

    const usersCollection = new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'user',
      driver: localForage[config.localForage.defaultDrivers['user']]
    }))
    const cartsCollection = new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'carts',
      driver: localForage[config.localForage.defaultDrivers['carts']]
    }))

    usersCollection.getItem('current-token', (err, currentToken) => { // TODO: if current token is null we should postpone the queue and force re-login - only if the task requires LOGIN!
      if (err) {
        console.error(err)
      }
      cartsCollection.getItem('current-cart-token', (err, currentCartId) => {
        if (err) {
          console.error(err)
        }

        if (!currentCartId && store.state.cart.cartServerToken) { // this is workaround; sometimes after page is loaded indexedb returns null despite the cart token is properly set
          currentCartId = store.state.cart.cartServerToken
        }

        if (!currentToken && store.state.user.cartServerToken) { // this is workaround; sometimes after page is loaded indexedb returns null despite the cart token is properly set
          currentToken = store.state.user.token
        }
        const fetchQueue = []
        console.debug('Current User token = ' + currentToken)
        console.debug('Current Cart token = ' + currentCartId)
        syncTaskCollection.iterate((task, id, iterationNumber) => {
          if (!task.transmited && !mutex[id]) { // not sent to the server yet
            mutex[id] = true // mark this task as being processed
            fetchQueue.push(() => {
              return execute(task, currentToken, currentCartId).then(executedTask => {
                syncTaskCollection.setItem(executedTask.task_id.toString(), executedTask)
                mutex[id] = false
              }).catch(err => {
                mutex[id] = false
                console.error(err)
              })
            })
          }
        }, (err, result) => {
          if (err) console.error(err)
          console.debug('Iteration has completed')
          // execute them serially
          serial(fetchQueue)
            .then(res => console.debug('Processing sync tasks queue has finished'))
        }).catch(err => {
          // This code runs if there were any errors
          console.log(err)
        })
      })
    })
  }
})

EventBus.$on('user-after-loggedin', receivedData => {
  store.dispatch('checkout/savePersonalDetails', {
    firstName: receivedData.firstname,
    lastName: receivedData.lastname,
    emailAddress: receivedData.email
  })
  if (store.state.ui.openMyAccount) {
    router.push({ name: 'my-account' })
    store.commit('ui/setOpenMyAccount', false)
  }
})

EventBus.$on('user-before-logout', () => {
  store.dispatch('user/logout', { silent: false })
  store.commit('ui/setSubmenu', {
    depth: 0
  })

  const usersCollection = Vue.prototype.$db.usersCollection
  usersCollection.setItem('current-token', '')

  if (store.state.route.path === '/my-account') {
    router.push('/')
  }
})

store.dispatch('cart/load')
store.dispatch('compare/load')
store.dispatch('recently-viewed/load')
store.dispatch('user/startSession')

window.addEventListener('online', () => { onNetworkStatusChange(store) })
