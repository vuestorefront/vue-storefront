import { register } from 'register-service-worker'
import { server } from 'config'
import { Logger } from '@vue-storefront/core/lib/logger'

if (process.env.NODE_ENV === 'production' || server.devServiceWorker) {
  register(`/service-worker.js`, {
    ready () {
      Logger.log(
        'App is being served from cache by a service worker.'
      )
    },
    cached () {
      Logger.log('Content has been cached for offline use.')()
    },
    updated (registration) {
      Logger.log('New content is available, please refresh.')()
    },
    offline () {
      Logger.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error (error) {
      Logger.error('Error during service worker registration:', error)()
    }
  })
}
