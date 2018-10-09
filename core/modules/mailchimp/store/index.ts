import * as TYPES from './mutation-types'
import config from 'config'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'

const cacheStorage = new UniversalStorage(localForage.createInstance({
  name: 'shop',
  storeName: 'mailchimpModule'
}))

export default {
  namespaced: true,
  state: {
    isSubscribed: null,
    email: null
  },
  mutations: {
    [TYPES.NEWSLETTER_SUBSCRIBE] (state) {
      state.isSubscribed = true
    },
    [TYPES.NEWSLETTER_UNSUBSCRIBE] (state) {
      state.isSubscribed = false
    },
    [TYPES.SET_EMAIL] (state, payload) {
      state.email = payload
    }
  },
  actions: {
    loadStateFromCache ({ commit }) {
      return new Promise((resolve, reject) => {
        cacheStorage.getItem('subscription', (err, subscription) => {
          if (!err) {
            subscription.isSubscribed ? commit(TYPES.NEWSLETTER_SUBSCRIBE) : commit(TYPES.NEWSLETTER_UNSUBSCRIBE)
            commit(TYPES.SET_EMAIL, subscription.email)
            resolve(subscription)
          } else {
            resolve(false)
          }
        })
      })
    },
    subscribe ({ commit, state }, email) {
      if (!state.isSubscribed) {
        return new Promise((resolve, reject) => {
          fetch(config.mailchimp.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email })
          }).then(res => {
            commit(TYPES.NEWSLETTER_SUBSCRIBE)
            commit(TYPES.SET_EMAIL, email)
            cacheStorage.setItem('subscription', {
              isSubscribed: true,
              email: email 
            })
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }
    },
    unsubscribe ({ commit, state }, email) {
      if (!state.isSubscribed) {
        return new Promise((resolve, reject) => {
          fetch(config.mailchimp.endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email })
          }).then(res => {
            commit(TYPES.NEWSLETTER_UNSUBSCRIBE)
            cacheStorage.setItem('subscription', {
              isSubscribed: true,
              email: null 
            })
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
      }
    }
  }
}
