import * as types from './mutation-types'
import config from 'config'
import { Module } from 'vuex'
import { mailchimpState } from '../types/mailchimpState'
import { cacheStorage } from '../'

export const module: Module<mailchimpState, any> ={
  namespaced: true,
  state: {
    isSubscribed: null,
    email: null,
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
    subscribe ({ commit, state }, email): Promise<Response> {
      if (!state.isSubscribed) {
        return new Promise((resolve, reject) => {
          fetch(config.mailchimp.endpoint, {
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
      if (!state.isSubscribed) {
        return new Promise((resolve, reject) => {
          fetch(config.mailchimp.endpoint, {
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
