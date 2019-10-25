import { MutationTree } from 'vuex'
import { mutationsFactory } from 'icmaa-cms/store/abstract/mutations'
import * as types from './mutation-types'
import SearchAliasState from '../../types/SearchAliasState'

const mutations: MutationTree<SearchAliasState> = mutationsFactory({
  add: types.ICMAA_SEARCHALIAS_ADD,
  upd: types.ICMAA_SEARCHALIAS_UPD,
  rmv: types.ICMAA_SEARCHALIAS_RMV
}, 'uuid')

export default mutations
