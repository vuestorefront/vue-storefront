import { MutationTree } from 'vuex'
import { mutationsFactory } from 'icmaa-cms/store/abstract/mutations'
import * as types from './mutation-types'
import TeaserState, { TagStateItem } from '../types/TeaserState'

const mutations: MutationTree<TeaserState> = {
  ...mutationsFactory({
    add: types.ICMAA_TEASER_ADD,
    upd: types.ICMAA_TEASER_UPD,
    rmv: types.ICMAA_TEASER_RMV
  }, 'uuid'),
  [types.ICMAA_TEASER_TAGS_SET] (state, tags: TagStateItem[]) {
    state.tags = tags || []
  }
}
export default mutations
