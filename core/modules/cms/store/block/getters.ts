import { GetterTree } from 'vuex'
import CmsBlockState from '../../types/CmsBlockState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<CmsBlockState, RootState> = {
  cmsBlocks: (state) => state.items,
  cmsBlockIdentifier: (state) => (identifier) => {
    return state.items.find(item => item.identifier === identifier)
  },
  cmsBlockId: (state) => (id) => {
    return state.items.find(item => item.id === id)
  }
}

export default getters
