import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import omit from 'lodash-es/omit'

export const mutations: MutationTree<any> = {
  [types.SET_CURRENT_ROUTE] (state, payload = {}) {
    state.currentRoute = omit({ ...payload }, ['matched'])
  },
  [types.SET_PREV_ROUTE] (state, payload = {}) {
    state.prevRoute = omit({ ...payload }, ['matched'])
  },
  [types.IS_BACK_ROUTE] (state, payload) {
    state.isBackRoute = payload
  }
}
