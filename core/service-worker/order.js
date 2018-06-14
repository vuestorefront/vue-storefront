// Offline orders notification
function sendNotification () {
  self.registration.showNotification('Order pending!', {
    body: 'There is an order that you made offline waiting for your confirmation',
    icon: 'theme/assets/logo.svg',
    requireInteraction: true
  })
}

self.addEventListener('sync', event => {
  if (event.tag === 'orderSync') {
    event.waitUntil(sendNotification())
  }
})

self.addEventListener('notificationclick', event => {
  const pageUrl = '/offlineorder'
  event.waitUntil(self.clients.openWindow(pageUrl))
})
