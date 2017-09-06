if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', { scope: '/' }).then(function () {
    if (navigator.serviceWorker.controller) {
      console.log('The service worker is currently handling network operations.')
    } else {
      console.log('Failed to register.')
    }
  })
}

function checkiIsOnline () {
  console.log('Are we online: ' + navigator.onLine)
}

window.addEventListener('online', checkiIsOnline)
window.addEventListener('offline', checkiIsOnline)

