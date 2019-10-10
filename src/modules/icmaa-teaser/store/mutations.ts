import { MutationTree } from 'vuex'
import { mutationsFactory } from 'icmaa-cms/store/abstract/mutations'
import * as types from './mutation-types'
import TeaserState from '../types/TeaserState'

const mutations: MutationTree<TeaserState> = mutationsFactory({
  add: types.ICMAA_TEASER_ADD,
  upd: types.ICMAA_TEASER_UPD,
  rmv: types.ICMAA_TEASER_RMV
}, 'uuid')

export default mutations
