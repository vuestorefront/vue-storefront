import { createApp } from './app'
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
import EventBus from 'src/event-bus/event-bus'
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

// Process the background tasks
EventBus.$on('sync/PROCESS_QUEUE', data => {
  console.log('Executing task queue')
  console.debug(event.data)
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
      if (!task.transmited) { // not sent to the server yet
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
              }
            } else {
              console.error('Bad response status: ' + response.status)
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
            } else {
              console.error('Unhandled error, wrong response format!')
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

