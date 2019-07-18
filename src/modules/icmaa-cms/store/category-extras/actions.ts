import { ActionTree } from 'vuex'
import { single as singleAbstract, MutationTypesInterface, SingleOptionsInterface } from '../abstract/actions'

import { cmsCategoryExtrasStorageKey as storageKey } from './'
import * as types from './mutation-types'
import CategoryExtrasState, { CategoryExtrasStateItem } from '../../types/CategoryExtrasState'
import RootState from '@vue-storefront/core/types/RootState'

const documentType = 'category-extras'
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_CMS_CATEGORY_EXRTAS_ADD,
  upd: types.ICMAA_CMS_CATEGORY_EXRTAS_UPD,
  rmv: types.ICMAA_CMS_CATEGORY_EXRTAS_RMV
}

const actions: ActionTree<CategoryExtrasState, RootState> = {
  single: async (context, options: SingleOptionsInterface): Promise<CategoryExtrasStateItem> =>
    singleAbstract<CategoryExtrasStateItem>({ documentType, mutationTypes, storageKey, context, options })
}

export default actions
