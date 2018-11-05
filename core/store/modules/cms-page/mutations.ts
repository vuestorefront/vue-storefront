import Vue from 'vue'
import { MutationTree } from 'vuex'
import { entityKeyName } from '../../lib/entities'
import * as types from '../../mutation-types'
import CmsPageState from './types/CmsPageState'

const mutations: MutationTree<CmsPageState> = {
  /**
   * Store CMS Pages by identifier in state and localForage
   * @param {} state
   * @param {Array} cmsPages
   */
  [types.CMSPAGE_UPDATE_CMSPAGES] (state, cmsPages) {
    let cmsPagesList = cmsPages.items // extract fields from ES _source
    state.cmsPages = cmsPagesList

    for (let cmsPages of cmsPagesList) {

      const cmsPagesCollection = Vue.prototype.$db.cmsPagesCollection
      try {
        cmsPagesCollection.setItem(entityKeyName('identifier', cmsPages.identifier.toLowerCase()), cmsPages).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache by slug
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default mutations
