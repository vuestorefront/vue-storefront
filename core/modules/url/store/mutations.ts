import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.REGISTER_MAPPING] (state, payload) {
    state.dispatcherMap[payload.url] = payload.routeData
  },
  [types.ADD_LAST_MATCHED_ROUTE] (state, payload) {
    state.lastMatchedRoute = payload
  }
}
