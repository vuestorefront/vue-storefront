import { createApp } from './app'
import { Config as config } from 'src/config'
require('./service-worker-registration') // register the service worker

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    Promise.all(activated.map(c => { // TODO: update me for mixins support
      const components = c.mixins ? Array.from(c.mixins) : []
      components.push(c)
      Promise.all(components.map(SubComponent => {
        if (SubComponent.asyncData) {
          return SubComponent.asyncData({
            store,
            route: to
          })
        }
      })).then(() => {
        next()
      }).catch(next)
    }))
  })
  app.$mount('#app')
})
// TODO: Move the order queue here from service worker!
import EventBus from 'src/event-bus'
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

import * as localForage from 'localforage'

EventBus.$on('order/PROCESS_QUEUE', event => {
  console.log('Sending out orders queue to server ...')

  const ordersCollection = localForage.createInstance({
    name: 'shop',
    storeName: 'orders'
  })

  const fetchQueue = []
  ordersCollection.iterate((order, id, iterationNumber) => {
    // Resulting key/value pair -- this callback
    // will be executed for every item in the
    // database.

    if (!order.transmited) { // not sent to the server yet
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
          }).then((response) => {
            if (response.status === 200) {
              const contentType = response.headers.get('content-type')
              if (contentType && contentType.includes('application/json')) {
                return response.json()
              } else {
                console.error('Error with response - bad content-type!')
              }
            } else {
              console.error('Bad response status: ' + response.status)
            }
          })
          .then(function (jsonResponse) {
            if (jsonResponse && jsonResponse.code === 200) {
              console.info('Response for: ' + orderId + ' = ' + jsonResponse.result)
              orderData.transmited = true
              orderData.transmited_at = new Date()
              ordersCollection.setItem(orderId.toString(), orderData)
            } else {
              console.error(jsonResponse.result)
            }
          })
      })
    }
  }).then(() => {
    console.log('Iteration has completed')

    // execute them serially
    serial(fetchQueue)
      .then((res) => console.info('Processing orders queue has finished'))
  }).catch((err) => {
    // This code runs if there were any errors
    console.log(err)
  })
})

// Process the background tasks
const mutex = {}
EventBus.$on('sync/PROCESS_QUEUE', data => {
  console.log('Executing task queue')
  // event.data.config - configuration, endpoints etc

  const syncTaskCollection = localForage.createInstance({
    name: 'shop',
    storeName: 'syncTasks'
  })

  const usersCollection = localForage.createInstance({
    name: 'shop',
    storeName: 'user'
  })

  usersCollection.getItem('current-token', (err, currentToken) => { // TODO: if current token is null we should postpone the queue and force re-login - only if the task requires LOGIN!
    if (err) {
      console.error(err)
    }
    const fetchQueue = []
    console.log('Current token = ' + currentToken)
    syncTaskCollection.iterate((task, id, iterationNumber) => {
      if (!task.transmited && !mutex[id]) { // not sent to the server yet
        mutex[id] = true // mark this task as being processed
        fetchQueue.push(() => {
          const taskData = task
          const taskId = id

          console.log('Pushing out offline task ' + taskId)
          return fetch(task.url.replace('{{token}}', currentToken), task.payload).then((response) => {
            if (response.status === 200) {
              const contentType = response.headers.get('content-type')
              if (contentType && contentType.includes('application/json')) {
                return response.json()
              } else {
                console.error('Error with response - bad content-type!')
                mutex[id] = false
              }
            } else {
              console.error('Bad response status: ' + response.status)
              mutex[id] = false
            }
          }).then((jsonResponse) => {
            if (jsonResponse) {
              console.info('Response for: ' + taskId + ' = ' + jsonResponse.result)
              taskData.transmited = true
              taskData.transmited_at = new Date()
              taskData.result = jsonResponse.result
              taskData.resultCode = jsonResponse.code
              taskData.acknowledged = false
              syncTaskCollection.setItem(taskId.toString(), taskData)

              if (taskData.callback_event) {
                EventBus.$emit(taskData.callback_event, taskData)
              }
            } else {
              console.error('Unhandled error, wrong response format!')
              mutex[id] = false
            }
          })
        })
      }
    }).then(() => {
      console.log('Iteration has completed')
      // execute them serially
      serial(fetchQueue)
        .then((res) => console.info('Processing sync tasks queue has finished'))
    }).catch((err) => {
      // This code runs if there were any errors
      console.log(err)
    })
  })
})

EventBus.$emit('order/PROCESS_QUEUE', { config: config }) // process checkout queue
EventBus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue

/**
 * Process order queue when we're back onlin
 */
function checkiIsOnline () {
  this.$bus.$emit('network.status', { online: navigator.onLine })
  console.log('Are we online: ' + navigator.onLine)

  if (navigator.onLine) {
    EventBus.$emit('order/PROCESS_QUEUE', { config: config }) // process checkout queue
    EventBus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue
  }
}

window.addEventListener('online', checkiIsOnline)
window.addEventListener('offline', checkiIsOnline)

EventBus.$on('user-after-loggedin', (receivedData) => {
  store.dispatch('checkout/savePersonalDetails', receivedData)
})
