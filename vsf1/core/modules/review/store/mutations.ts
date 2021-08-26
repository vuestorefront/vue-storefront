import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import ReviewState from '../types/ReviewState'

const mutations: MutationTree<ReviewState> = {
  [types.REVIEW_UPD_REVIEWS] (state, items) {
    state.items = items
  }
}

export default mutations
