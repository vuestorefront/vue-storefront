import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CmsBlockState from '../../types/CmsBlockState'

const mutations: MutationTree<CmsBlockState> = {
  /**
   * Store CMS
   * @param {} state
   * @param {} cms
   */
  [types.CMS_PRISMIC_ADD_CONTENT_BY_ID] (state, cms ) {
    const record = state.id.find(c => c.id === cms['id'])
    if (!record) {
      state.id.push(cms)
    }
  },
  [types.CMS_PRISMIC_ADD_CONTENT_BY_TYPE] (state, cms) {
    const record = state.type.find(c => c.type === cms[0]['type'])
    if (!record) {
      for (let item of cms) {
        state.type.push(item)
      }
    }
  }
}

export default mutations
