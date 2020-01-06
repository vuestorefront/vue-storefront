import { ActionTree } from 'vuex'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState';
import CmsBlockState from '../../types/CmsBlockState'
import { createLoadingBlockQuery, createSingleBlockQuery } from '@vue-storefront/core/modules/cms/helpers'

const actions: ActionTree<CmsBlockState, RootState> = {
  async list ({ getters, commit }, { filterValues = null, filterField = 'identifier', size = 150, start = 0, excludeFields = null, includeFields = null, skipCache = false }) {
    if (skipCache || !getters.hasItems) {
      const blockResponse = await quickSearchByQuery({
        query: createLoadingBlockQuery({ filterField, filterValues }),
        entityType: 'cms_block',
        size,
        start,
        excludeFields,
        includeFields
      })

      commit(types.CMS_BLOCK_UPDATE_CMS_BLOCKS, blockResponse.items)
      return blockResponse.items
    }

    return getters.getCmsBlocks
  },
  async single ({ getters, commit }, { key = 'identifier', value, excludeFields = null, includeFields = null, skipCache = false }) {
    let cmsBlock = getters.findCmsBlocks({ key, value })

    if (skipCache || cmsBlock.length === 0) {
      const blockResponse = await quickSearchByQuery({
        query: createSingleBlockQuery({ key, value }),
        entityType: 'cms_block',
        excludeFields,
        includeFields
      })

      if (blockResponse.items.length > 0) {
        commit(types.CMS_BLOCK_ADD_CMS_BLOCK, blockResponse.items[0])
        return blockResponse.items[0]
      }
    }

    return cmsBlock[0]
  },
  addItem ({ commit }, block) {
    commit(types.CMS_BLOCK_ADD_CMS_BLOCK, block)
  }
}

export default actions
