import * as types from './mutation-types'
import { Module } from 'vuex'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { NewsletterState } from '../types/NewsletterState'
import { NewsletterService } from '@vue-storefront/core/data-resolver'
import Task from 'core/lib/sync/types/Task';

export const newsletterStore: Module<NewsletterState, any> = {
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
    async status ({ commit }, email): Promise<Task> {
      const statusResponse = await NewsletterService.status(email)

      if (statusResponse.result === 'subscribed') {
        commit(types.SET_EMAIL, email)
        commit(types.NEWSLETTER_SUBSCRIBE)
      } else {
        commit(types.NEWSLETTER_UNSUBSCRIBE)
      }

      return statusResponse
    },
    async subscribe ({ commit, getters, dispatch }, email): Promise<Task> {
      if (getters.isSubscribed) return

      const subscribeResponse = await NewsletterService.subscribe(email)

      commit(types.NEWSLETTER_SUBSCRIBE)
      commit(types.SET_EMAIL, email)
      await dispatch('storeToCache', { email })

      return subscribeResponse
    },
    async unsubscribe ({ commit, getters }, email): Promise<Task> {
      if (!getters.isSubscribed) return

      const unsubscribeResponse = await NewsletterService.unsubscribe(email)
      commit(types.NEWSLETTER_UNSUBSCRIBE)

      return unsubscribeResponse
    },
    async storeToCache (context, { email }) {
      const newsletterStorage = StorageManager.get('newsletter')
      await newsletterStorage.setItem('email', email)
    }
  }
}
