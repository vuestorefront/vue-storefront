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
    // TODO: Don't send it while offline, it's redundant
    subscribe ({ commit, state, dispatch }, email) {
      if (!state.isSubscribed) {
        return new Promise((resolve, reject) => {
          dispatch('sync/queue', 
            { url: config.mailchimp.endpoint,
              payload: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify(email)
              }
            }, { root: true }).then(task => {
            commit(TYPES.NEWSLETTER_SUBSCRIBE)
            resolve(task)
          }).catch(err => {
            reject(err)
          })
        })
      }
    },
    unsubscribe ({ commit, state, dispatch }, email) {
      if (!state.isSubscribed) {
        return new Promise((resolve, reject) => {
        dispatch('sync/queue', { url: config.mailchimp.endpoint,
          payload: {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(email)
          }
        }, { root: true }).then(task => {
          commit(TYPES.NEWSLETTER_UNSUBSCRIBE)
          resolve(task)
        }).catch(err => {
          reject(err)
        })
      })
      }
    }
  }
}
