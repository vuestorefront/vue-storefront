import { GetterTree } from 'vuex'
import CmsBlockState from '../../types/CmsBlockState'
import RootState from '@vue-storefront/core/types/RootState'
import { Logger } from '@vue-storefront/core/lib/logger'

const getters: GetterTree<CmsBlockState, RootState> = {
  cmsBlocks: (state, getters) => {
    Logger.error('The getter cmsBlock/addMethod has been deprecated please change to cmsBlock/getCmsBlocks')()

    return getters.getCmsBlocks
  },
  cmsBlockIdentifier: (state, getters) => (identifier) => {
    Logger.error('The getter cmsBlock/cmsBlockIdentifier has been deprecated please change to cmsBlock/getCmsBlockIdentifier')()

    return getters.cmsBlockIdentifier(identifier)
  },
  cmsBlockId: (state, getters) => (id) => {
    Logger.error('The getter cmsBlock/cmsBlockId has been deprecated please change to cmsBlock/getCmsBlockId')()

    return getters.getCmsBlockId(id)
  },
  getCmsBlockIdentifier: (state) => (identifier) =>
    state.items.find(item => typeof item === 'object' && item.identifier === identifier),
  getCmsBlockId: (state) => (id) => state.items.find(item => item.id === id),
  getCmsBlocks: (state) => state.items,
  hasItems: (state) => state.items && state.items.length > 0,
  findCmsBlocks: (state, getters) => ({ key, value }) => {
    if (getters.hasItems) {
      return state.items.filter(item => item[key] === value)
    }

    return []
  }
}

export default getters
