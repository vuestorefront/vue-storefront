import { MutationTree } from 'vuex'
import { mutationsFactory } from 'icmaa-cms/store/abstract/mutations'
import * as types from './mutation-types'
import AdviceState from '../types/AdviceState'

const mutations: MutationTree<AdviceState> = mutationsFactory({
  add: types.ICMAA_ADVICE_ADD,
  upd: types.ICMAA_ADVICE_UPD,
  rmv: types.ICMAA_ADVICE_RMV
}, 'uuid')

export default mutations
