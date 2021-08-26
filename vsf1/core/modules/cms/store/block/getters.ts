import { GetterTree } from 'vuex'
import CmsBlockState from '../../types/CmsBlockState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<CmsBlockState, RootState> = {
  // @deprecated
  cmsBlocks: (state, getters) => getters.getCmsBlocks,
  // @deprecated
  cmsBlockIdentifier: (state, getters) => (identifier) => getters.getCmsBlockByIdentifier(identifier),
  // @deprecated
  cmsBlockId: (state, getters) => (id) => getters.getCmsBlockById(id),
  getCmsBlockByIdentifier: (state) => (identifier) =>
    state.items.find(item => typeof item === 'object' && item.identifier === identifier),
  getCmsBlockById: (state) => (id) => state.items.find(item => item.id === id),
  getCmsBlocks: (state) => state.items,
  hasItems: (state) => state.items && state.items.length > 0,
  findCmsBlocks: (state) => ({ key, value }) => state.items.filter(item => item[key] === value)
}

export default getters
