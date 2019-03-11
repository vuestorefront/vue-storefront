import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CmsBlockState from '../../types/CmsBlockState'

const mutations: MutationTree<CmsBlockState> = {
  /**
   * Store CMS
   * @param {any} state
   * @param {Object} cms
   */
  [types.CMS_PRISMIC_ADD_CONTENT] (state, cms ) {
    console.log('###', 'add content')
    if (cms.lenght > 1) {
      console.log('###', 'add multiple')
      cms.forEach((element) => {
       state.items[element.id] = element.data
      })
    } else {
      if (cms[0] && cms[0].id) {
        state.items[cms[0].id] = cms[0].data
      }
    }
  },
}

export default mutations
