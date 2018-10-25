import { Module } from 'vuex'
import NotificationItem from '../types/NotificationItem'

export const module: Module<any, any> = {
  namespaced: true,
  state: {
    notifications: []
  },
  getters: {
    notifications: state => state.notifications
  },
  mutations: {
    add (state, payload) {
      state.notifications.push(payload)
    },
    remove (state, index) {
      state.notifications.splice(index, 1)
    }
  },
  actions: {
    addNotification ({ commit, state, dispatch }, notification: NotificationItem) {
      if (state.notifications.length > 0
        && state.notifications[state.notifications.length - 1].message === notification.message
      ) {
        return
      }
      commit('add', notification)
      setTimeout(() => {
        dispatch('removeNotification')
      }, notification.timeToLive || 5000)
    },
    removeNotification ({ commit, state }, index?: number) {
      if (!index) {
        commit('remove', state.notifications.length - 1)
      } else {
        commit('remove', index)
      }
    }
  }
}
