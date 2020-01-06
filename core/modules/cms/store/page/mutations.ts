import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CmsPageState from '../../types/CmsPageState'

const mutations: MutationTree<CmsPageState> = {
  [types.CMS_PAGE_UPDATE_CMS_PAGES] (state, cmsPages) {
    state.items = cmsPages || []
  },
  [types.CMS_PAGE_SET_CURRENT] (state, current) {
    state.current = current
  },
  [types.CMS_PAGE_ADD_CMS_PAGE] (state, cmsPage) {
    const record = state.items.find(c => c.id === cmsPage.id)
    if (!record) {
      state.items.push(cmsPage)
    }
  }
}

export default mutations
