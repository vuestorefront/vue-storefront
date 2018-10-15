import * as TYPES from './mutation-types'
import config from 'config'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'
import { KEY } from '../'
import { Module } from 'vuex'

const storeView = currentStoreView()
const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''
const cacheStorage = new UniversalStorage(localForage.createInstance({
  name: dbNamePrefix + 'shop',
  storeName: KEY
}))

export const store: Module<any, any> ={
  namespaced: true,
  state: {
    isSubscribed: null,
    email: null,
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
    subscribe ({ commit, state }, email): Promise<Response> {
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
            cacheStorage.setItem('email', email)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }
    },
    unsubscribe ({ commit, state }, email): Promise<Response> {
      if (!state.isSubscribed) {
        return new Promise((resolve, reject) => {
          fetch(config.mailchimp.endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email })
          }).then(res => {
            commit(TYPES.NEWSLETTER_UNSUBSCRIBE)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
      }
    }
  }
}
