import * as TYPES from './mutation-types'
import config from 'config'
import Vue from 'vue'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'

const cacheStorage = new UniversalStorage(localForage.createInstance({
  name: 'shop',
  storeName: 'mailchimpModule'
}))

let defaultSubscription = (() => {
  cacheStorage.getItem('subscribed', (err, subscription) => {
    if (!err) {
      console.info(subscription)
      return subscription
    } else {
      return 'dupa'
    }
  })
})()

export default {
  namespaced: true,
  state: {
    isSubscribed: defaultSubscription,
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
        return new Promise((resolve, reject) => {
          fetch(config.mailchimp.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email })
          }).then(res => {
            commit(TYPES.NEWSLETTER_SUBSCRIBE)
            cacheStorage.setItem('subscribed', true)
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
            // cacheStorage.setItem('subscribed', false)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
      }
    }
  }
}
