import { MutationTree } from 'vuex'
import { mutationsFactory } from 'icmaa-cms/store/abstract/mutations'
import * as types from './mutation-types'
import CompetitionsState from '../types/CompetitionsState'

const mutations: MutationTree<CompetitionsState> = mutationsFactory({
  add: types.ICMAA_COMPETITIONS_ADD,
  upd: types.ICMAA_COMPETITIONS_UPD,
  rmv: types.ICMAA_COMPETITIONS_RMV
})

export default mutations
