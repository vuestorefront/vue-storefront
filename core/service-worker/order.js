// Offline order notification object
function sendNotification () {
  self.registration.showNotification('Order pending!', {
    body: 'There is an order that you made offline waiting for your confirmation',
    icon: 'theme/assets/logo.svg',
    requireInteraction: true
  }).then(createdNotification => {
    console.log(createdNotification)
  })
}

function openShop (notification) {
  const pageUrl = '/?order=123'
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
