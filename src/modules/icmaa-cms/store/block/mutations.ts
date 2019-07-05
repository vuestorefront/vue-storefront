import { MutationTree } from 'vuex'
import { mutationsFactory } from '../abstract/mutations'
import * as types from './mutation-types'
import BlockState from '../../types/BlockState'

const mutations: MutationTree<BlockState> = mutationsFactory({
  add: types.ICMAA_CMS_BLOCK_ADD,
  upd: types.ICMAA_CMS_BLOCK_UPD,
  rmv: types.ICMAA_CMS_BLOCK_RMV
})

export default mutations
