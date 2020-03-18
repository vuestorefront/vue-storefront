import { ActionTree } from 'vuex'
import { single as singleAbstract, list as listAbstract, MutationTypesInterface, SingleOptionsInterface, ListOptionsInterface } from 'icmaa-cms/store/abstract/actions'

import { formsStateKey as stateKey } from './'
import * as types from './mutation-types'
import FormsState, { FormsStateItem } from '../types/FormsState'
import RootState from '@vue-storefront/core/types/RootState'

const documentType = 'form'
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_FORMS_ADD,
  upd: types.ICMAA_FORMS_UPD,
  rmv: types.ICMAA_FORMS_RMV
}

const actions: ActionTree<FormsState, RootState> = {
  single: async (context, options: SingleOptionsInterface): Promise<FormsStateItem> =>
    singleAbstract<FormsStateItem>({ documentType, mutationTypes, stateKey, context, options }),
  list: async (context, options: ListOptionsInterface): Promise<FormsStateItem[]> =>
    listAbstract<FormsStateItem>({ documentType, mutationTypes, stateKey, context, options })
}

export default actions
