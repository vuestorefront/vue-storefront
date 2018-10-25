// Offline order notification object
import config from 'config'

function sendNotification () {
  const title = config.orders.offline_orders.notification.title
  const message = config.orders.offline_orders.notification.message
  const icon = config.orders.offline_orders.notification.icon

  self.registration.showNotification(title, {
    body: message,
    icon: icon,
    requireInteraction: true
  })
}

function openShop (notification) {
  const pageUrl = '/?order=offline'
  self.clients.openWindow(pageUrl)
  notification.close()
}

self.addEventListener('sync', event => {
  if (event.tag === 'orderSync') {
    event.waitUntil(sendNotification())
  }
})

self.addEventListener('notificationclick', event => {
  event.waitUntil(openShop(event.notification))
})
