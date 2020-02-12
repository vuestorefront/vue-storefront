import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import omit from 'lodash-es/omit'

export const mutations: MutationTree<any> = {
  [types.REGISTER_MAPPING] (state, payload) {
    state.dispatcherMap = Object.assign({}, state.dispatcherMap, { [payload.url]: payload.routeData })
  },
  [types.SET_CURRENT_ROUTE] (state, payload = {}) {
    state.currentRoute = omit(payload, ['matched'])
  }
}
