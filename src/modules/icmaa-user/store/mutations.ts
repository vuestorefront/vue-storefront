import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import UserState from '../types/UserState'

const mutations: MutationTree<UserState> = {
  [types.USER_ADD_SESSION_DATA] (state, { key, value }) {
    Vue.set(state.sessionData, key, value)
  },
  [types.USER_SET_SESSION_DATA] (state, payload) {
    state.sessionData = payload
  }
}

export default mutations
