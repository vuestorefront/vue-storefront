import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CmsBlockState from '../../types/CmsBlockState'

const mutations: MutationTree<CmsBlockState> = {
  [types.CMS_BLOCK_UPDATE_CMS_BLOCKS] (state, cmsBlocks) {
    state.items = cmsBlocks || []
  },
  [types.CMS_BLOCK_ADD_CMS_BLOCK] (state, cmsBlock) {
    const record = state.items.find(c => c.id === cmsBlock.id)
    if (!record) {
      state.items.push(cmsBlock)
    }
  }
}

export default mutations
