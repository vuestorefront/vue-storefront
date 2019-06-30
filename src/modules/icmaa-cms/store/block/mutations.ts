import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import BlockState from '../../types/BlockState'

const mutations: MutationTree<BlockState> = {
  [types.ICMAA_CMS_BLOCK_ADD_CMS_BLOCK] (state, payload) {
    const item = state.items.find(item => item.identifier === payload.identifier)
    if (!item) {
      state.items.push(payload)
    }
  },
  [types.ICMAA_CMS_BLOCK_UPD_CMS_BLOCK] (state, payload) {
    const index = state.items.findIndex(item => item.identifier === payload.identifier)
    if (index !== -1) {
      // Need to use slice because otherwise its not reactive
      // @see https://vuejs.org/v2/guide/list.html#Caveats
      state.items.splice(index, 1, payload)
    } else {
      state.items.push(payload)
    }
  },
  [types.ICMAA_CMS_BLOCK_RMV_CMS_BLOCK] (state, payload) {
    const index = state.items.findIndex(item => item.identifier === payload.identifier)
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  }
}

export default mutations
