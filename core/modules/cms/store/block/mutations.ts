import Vue from 'vue'
import { MutationTree } from 'vuex'
import { entityKeyName } from '@vue-storefront/store/lib/entities'
import * as types from './mutation-types'
import CmsBlockState from '../../types/CmsBlockState'

const mutations: MutationTree<CmsBlockState> = {
  /**
   * Store CMS Blocks by identifier in state and localForage
   * @param {} state
   * @param {Array} cmsBlocks
   */
  [types.CMS_BLOCK_UPDATE_CMS_BLOCKS] (state, cmsBlocks) {
    // save cmsBlocksList data to the state and DB
    state.cmsBlocks = cmsBlocks

    console.log('cmsBlocks mutation', cmsBlocks.length)

    for (let cmsBlock of cmsBlocks) {

      const cmsBlocksCollection = Vue.prototype.$db.cmsBlocksCollection
      try {
        cmsBlocksCollection.setItem(entityKeyName('identifier', cmsBlock.identifier.toLowerCase()), cmsBlock).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache by slug
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default mutations
