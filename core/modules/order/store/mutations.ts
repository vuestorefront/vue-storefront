import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import OrderState from '../types/OrderState'

const mutations: MutationTree<OrderState> = {
  [types.ORDER_LAST_ORDER_WITH_CONFIRMATION] (state, payload) {
    state.last_order_confirmation = payload
  },
  [types.ORDER_ADD_SESSION_ORDER_HASH] (state, hash: string) {
    state.session_order_hashes.push(hash)
  },
  [types.ORDER_REMOVE_SESSION_ORDER_HASH] (state, hash: string) {
    state.session_order_hashes = state.session_order_hashes.filter(sessionHash => sessionHash !== hash)
  }
}

export default mutations
