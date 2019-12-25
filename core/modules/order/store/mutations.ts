import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import OrderState from '../types/OrderState'
import { Order } from '../types/Order'
import * as entities from '@vue-storefront/core/lib/store/entities'

const mutations: MutationTree<OrderState> = {
  [types.ORDER_LAST_ORDER_WITH_CONFIRMATION] (state, payload) {
    state.last_order_confirmation = payload
  },
  [types.ORDER_ADD_SESSION_STAMPS] (state, order: Order) {
    const orderId = entities.uniqueEntityId(order) // timestamp as a order id is not the best we can do but it's enough
    order.order_id = orderId.toString()
    order.created_at = new Date().toString()
    order.updated_at = new Date().toString()
  },
  [types.ORDER_ADD_SESSION_ORDER_HASH] (state, hash: string) {
    state.session_order_hashes.push(hash)
  },
  [types.ORDER_REMOVE_SESSION_ORDER_HASH] (state, hash: string) {
    state.session_order_hashes = state.session_order_hashes.filter(sessionHash => sessionHash !== hash)
  }
}

export default mutations
