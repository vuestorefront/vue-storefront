import { Module } from 'vuex'
import { ClearCacheState } from '../types/ClearCacheState'

export const ClearCacheStore: Module<ClearCacheState, any> = {
  namespaced: true,
  state: {
    open: false
  },
  mutations: {
    setNotificationOpen (state, value) {
      state.open = value
    }
  },
  actions: {
    toggleOpen ({ commit }, value) {
      commit('setNotificationOpen', value)
    }
  }
}
