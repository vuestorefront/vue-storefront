import * as config from './config'
import * as localForage from 'localforage'
import * as types from './store/mutation-types'
import Vue from 'vue'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', { scope: '/' }).then(function () {
    if (navigator.serviceWorker.controller) {
      console.log('The service worker is currently handling network operations.')
    } else {
      console.log('Failed to register.')
    }
  })
}

/**
 * Process order queue when we're back onlin
 */
function checkiIsOnline () {
  console.log('Are we online: ' + navigator.onLine)

  if (navigator.onLine) {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      if (!('localDb' in global)) {
        Vue.prototype.$localDb = localForage.createInstance({
          name: 'store'
        })
        global.localDb = Vue.prototype.$localDb
      }

      global.localDb.getItem('vue-storefront-orders', (err, queue) => {
        if (err) throw new Error(err)
        navigator.serviceWorker.controller.postMessage({ config: config, queue: queue, command: types.CHECKOUT_PROCESS_QUEUE })
      })
    }
  }
}

window.addEventListener('online', checkiIsOnline)
window.addEventListener('offline', checkiIsOnline)

