export function postMessage (payload) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) { // check if it's properly installed
    navigator.serviceWorker.controller.postMessage(payload)
    return false
  } else { // no service workers supported push the queue manualy
    return true
  }
}
