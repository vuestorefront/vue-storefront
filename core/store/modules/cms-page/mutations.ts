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
  [types.CMS_PAGE_UPDATE_CMS_PAGES] (state, cmsPages) {
    // save cmsPagesList data to the state and DB
    state.cmsPages = cmsPages

    for (let cmsPage of cmsPages) {
      const cmsPagesCollection = Vue.prototype.$db.cmsPagesCollection
      try {
        cmsPagesCollection.setItem(entityKeyName('identifier', cmsPage.identifier.toLowerCase()), cmsPage).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache by slug
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default mutations
