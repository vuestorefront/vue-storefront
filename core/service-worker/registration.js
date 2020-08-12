import { server } from 'config'
import { Workbox } from 'workbox-window'

if ('serviceWorker' in navigator && (process.env.NODE_ENV === 'production' || server.devServiceWorker)) {
  const wb = new Workbox('/service-worker.js')
  wb.register()
}
