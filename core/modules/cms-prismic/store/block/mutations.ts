import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CmsBlockState from '../../types/CmsBlockState'

const mutations: MutationTree<CmsBlockState> = {
  /**
   * Store CMS
   * @param {any} state
   * @param {Object} data
   * @param {String} index
   */
  [types.CMS_PRISMIC_ADD_CONTENT] (state, {data, index}) {
    if (data.length > 1) {
      let res = []
      data.forEach((element) => {
        res.push(element.data)
      })
      state.items[index] = res
    } else {
      if (data[0] && data[0].id) {
        state.items[index] = [data[0].data]
      }
    }
  },
}

export default mutations
