import * as TYPES from './mutation-types'
import config from 'config'

export default {
  namespaced: true,
  state: {
    isSubscribed: false,
    subscription: null
  },
  mutations: {
    [TYPES.NEWSLETTER_SUBSCRIBE] (state) {
      state.isSubscribed = true
    },
    [TYPES.NEWSLETTER_UNSUBSCRIBE] (state) {
      state.isSubscribed = true
    }
  },
  actions: {
    subscribe ({ commit, state, dispatch }, email) {
      if (!state.isSubscribed) {
        dispatch('sync/queue', 
          { url: config.mailchimp.endpoint,
            payload: {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              mode: 'cors',
              body: JSON.stringify(email)
            }
          }, { root: true }).then(task => {
          console.log('Mailchimp subscription added ')
          console.log(task)
        })
        commit(TYPES.NEWSLETTER_SUBSCRIBE)
      }
    },
    unsubscribe ({ commit, state, dispatch }, email) {
      if (!state.isSubscribed) {
        dispatch('sync/queue', { url: config.mailchimp.endpoint,
          payload: {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(email)
          }
        }, { root: true }).then(task => {
          console.log('Mailchimp subscription removed ')
          console.log(task)
        })
        commit(TYPES.NEWSLETTER_SUBSCRIBE)
      }
    }
  }
}
