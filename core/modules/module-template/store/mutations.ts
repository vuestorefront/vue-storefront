import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_USERS] (state, payload) {
    state.users = payload
  },
  [types.ADD_USER] (state, payload) {
    state.users.push(payload)
  }  
}