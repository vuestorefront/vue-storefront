import { ActionTree } from 'vuex'
import { single as singleAbstract, list as listAbstract, MutationTypesInterface, SingleOptionsInterface, ListOptionsInterface } from '../abstract/actions'

import { cmsBlockStateKey as stateKey } from './'
import * as types from './mutation-types'
import BlockState, { BlockStateItem } from '../../types/BlockState'
import RootState from '@vue-storefront/core/types/RootState'

const documentType = 'block'
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_CMS_BLOCK_ADD,
  upd: types.ICMAA_CMS_BLOCK_UPD,
  rmv: types.ICMAA_CMS_BLOCK_RMV
}

const actions: ActionTree<BlockState, RootState> = {
  single: async (context, options: SingleOptionsInterface): Promise<BlockStateItem> =>
    singleAbstract<BlockStateItem>({ documentType, mutationTypes, stateKey, context, options }),
  list: async (context, options: ListOptionsInterface): Promise<BlockStateItem[]> =>
    listAbstract<BlockStateItem>({ documentType, mutationTypes, stateKey, context, options })
}

export default actions
