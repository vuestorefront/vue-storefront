import { ActionTree } from 'vuex'
import { single as singleAbstract, MutationTypesInterface, SingleOptionsInterface, OptionsInterface } from '../abstract/actions'

import { cmsBlockStorageKey as storageKey } from './'
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
    singleAbstract<BlockStateItem>({ documentType, mutationTypes, storageKey, context, options })
}

export default actions
