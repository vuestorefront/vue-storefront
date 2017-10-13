import config from './config'
import * as types from './store/mutation-types'

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
      navigator.serviceWorker.controller.postMessage({ config: config, command: types.ORDER_PROCESS_QUEUE })
    }
  }
}

window.addEventListener('online', checkiIsOnline)
window.addEventListener('offline', checkiIsOnline)

