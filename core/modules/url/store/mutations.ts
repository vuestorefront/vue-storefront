import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.REGISTER_MAPPING] (state, payload) {
    state.dispatcherMap[payload.url] = payload.routeData
  }
}
