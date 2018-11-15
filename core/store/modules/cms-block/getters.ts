import { GetterTree } from 'vuex'
import CmsBlockState from './types/CmsBlockState'
import RootState from '../../types/RootState'

const getters: GetterTree<CmsBlockState, RootState> = {
  cmsBlocks: (state) => state.cmsBlocks,
  cmsBlockIdentifier: (state) => (identifier) => {
    return state.cmsBlocks.find(item => item.identifier === identifier)
  },
  cmsBlockId: (state) => (id) => {
    return state.cmsBlocks.find(item => item.block_id === id)
  },
}

export default getters
