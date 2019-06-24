import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import BlockState from '../../types/BlockState'

const mutations: MutationTree<BlockState> = {
  [types.ICMAA_CMS_BLOCK_ADD_CMS_BLOCK] (state, payload) {
    const item = state.items.find(item => item.identifier === payload.identifier)
    if (!item) {
      state.items.push(payload)
    }
  }
}

export default mutations
