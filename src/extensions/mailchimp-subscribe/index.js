const EXTENSION_KEY = 'mailchimp-subscribe'

import extensionStore from './store'
import extensionRoutes from './router'
import EventBus from 'src/event-bus'

export default function (app, router, store, config) {
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
