import { MutationTree } from 'vuex'
import { mutationsFactory } from 'icmaa-cms/store/abstract/mutations'
import * as types from './mutation-types'
import FormsState from '../types/FormsState'

const mutations: MutationTree<FormsState> = mutationsFactory({
  add: types.ICMAA_FORMS_ADD,
  upd: types.ICMAA_FORMS_UPD,
  rmv: types.ICMAA_FORMS_RMV
}, 'identifier')

export default mutations
