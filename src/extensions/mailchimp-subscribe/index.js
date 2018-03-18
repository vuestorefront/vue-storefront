const extensionStore = require('./store')
const extensionRoutes = require('./router')
const EventBus = require('core/plugins/event-bus')

const EXTENSION_KEY = 'mailchimp-subscribe'

module.exports = function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store
  console.log('Mailchimp extension registered')
  EventBus.$on('newsletter-after-unsubscribe', (payload) => {
    console.log('Mailchimp unsubscribe')
    store.dispatch('sync/queue', { url: config.mailchimp.endpoint,
      payload: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(payload)
      }
    }, { root: true }).then(task => {
      console.log('Mailchimp subscription removed ')
      console.log(task)
    })
  })
  EventBus.$on('newsletter-after-subscribe', (payload) => {
    store.dispatch('sync/queue', { url: config.mailchimp.endpoint,
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(payload)
      }
    }, { root: true }).then(task => {
      console.log('Mailchimp subscription added ')
      console.log(task)
    })
  })

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}
