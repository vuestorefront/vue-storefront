import { MutationTree } from 'vuex'
import TrackingState from '../types/TrackingState'
import * as types from './mutation-types'

const mutations: MutationTree<TrackingState> = {
  [types.ICMAA_TRACKING_ADD_ORDER] (state, payload) {
    state.orders.push(payload)
  },
  [types.ICMAA_TRACKING_CLR_ORDER] (state) {
    state.orders = []
  }
}

export default mutations
