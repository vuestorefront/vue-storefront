import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'

const mutations: MutationTree<RootState> = {
  [types.USER_TOKEN_INVALIDATE_LOCK_CHANGED] (state, payload) {
    state.userTokenInvalidateLock = payload
  }
}

export default mutations
