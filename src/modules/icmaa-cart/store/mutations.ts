import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CartState from '../types/CartState'

const mutations: MutationTree<CartState> = {
  [types.CART_ADD_FREE_ITEM] (state, cartItemId: string) {
    state.freeCartItems.push(cartItemId)
  },
  [types.CART_DEL_FREE_ITEM] (state) {
    state.freeCartItems = []
  }
}

export default mutations
