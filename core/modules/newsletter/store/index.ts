import * as types from './mutation-types'
import { Module } from 'vuex'
import { NewsletterState } from '../types/NewsletterState'
import { cacheStorage } from '../'
import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers'

export const module: Module<NewsletterState, any> = {
  namespaced: true,
  state: {
    isSubscribed: null,
    email: null
  },
  getters: {
    isSubscribed: state => state.isSubscribed,
    email: state => state.email
  },
  mutations: {
    [types.NEWSLETTER_SUBSCRIBE] (state) {
      state.isSubscribed = true
    },
    [types.NEWSLETTER_UNSUBSCRIBE] (state) {
      state.isSubscribed = false
    },
    [types.SET_EMAIL] (state, payload) {
      state.email = payload
    }
  },
  actions: {
    status ({ commit, state }, email): Promise<Response> {
      return new Promise((resolve, reject) => {
        fetch(processURLAddress(config.newsletter.endpoint) + '?email=' + encodeURIComponent(email), {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        }).then(res => res.json())
          .then(res => {
            if (res.result === 'subscribed') {
              commit(types.SET_EMAIL, email)
              commit(types.NEWSLETTER_SUBSCRIBE)
            } else {
              commit(types.NEWSLETTER_UNSUBSCRIBE)
            }
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },
    subscribe ({ commit, state }, email): Promise<Response> {
      if (!state.isSubscribed) {
        return new Promise((resolve, reject) => {
          fetch(processURLAddress(config.newsletter.endpoint), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email })
          }).then(res => {
            commit(types.NEWSLETTER_SUBSCRIBE)
            commit(types.SET_EMAIL, email)
            cacheStorage.setItem('email', email)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }
    },
    unsubscribe ({ commit, state }, email): Promise<Response> {
      if (state.isSubscribed) {
        return new Promise((resolve, reject) => {
          fetch(processURLAddress(config.newsletter.endpoint), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email })
          }).then(res => {
            commit(types.NEWSLETTER_UNSUBSCRIBE)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
  }
}
