import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_STORE_INFO] (state, payload) {
    state.storeInfo = payload === true
  },
  [types.SET_SELECTED_STORE] (state, payload) {
    if (payload) {
      state.selectedStore = payload
    }
  }
}
