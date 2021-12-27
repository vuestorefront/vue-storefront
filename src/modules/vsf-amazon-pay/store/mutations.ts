import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import { AmazonPayState } from '../types/AmazonPayState'

export const mutations: MutationTree<AmazonPayState> = {
  [types.SET_AMAZON_PAYMENTS_READY] (state, amazonPaymentsReady) {
    state.amazonPaymentsReady = amazonPaymentsReady
  },
  [types.SET_ORDER_REFERENCE_ID] (state, orderReferenceId) {
    state.orderReferenceId = orderReferenceId
  },
  [types.SET_ORDER_STATE] (state, orderState) {
    state.orderState = orderState
  },
  // [types.SET_USER_ID] (state, userId) {
  //   state.userId = userId
  // },
  [types.SET_USER_TOKEN] (state, userToken) {
    state.userToken = userToken
  },
  [types.RESET_ORDER] (state) {
    state.orderReferenceId = null
    state.orderState = null
  },
  [types.RESET_USER] (state) {
    // state.userId = null
    state.userToken = null
  },
  [types.RESET] (state) {
    state.orderReferenceId = null
    state.orderState = null
    // state.userId = null
    state.userToken = null
  }
}