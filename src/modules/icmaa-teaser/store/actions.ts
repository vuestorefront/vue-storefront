import { ActionTree } from 'vuex'
import { single as singleAbstract, list as listAbstract, MutationTypesInterface, SingleOptionsInterface, ListOptionsInterface } from 'icmaa-cms/store/abstract/actions'

import { teaserStorageKey as storageKey } from './'
import * as types from './mutation-types'
import TeaserState, { TeaserStateItem } from '../types/TeaserState'
import RootState from '@vue-storefront/core/types/RootState'

const documentType = 'teaser'
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_TEASER_ADD,
  upd: types.ICMAA_TEASER_UPD,
  rmv: types.ICMAA_TEASER_RMV
}

const actions: ActionTree<TeaserState, RootState> = {
  single: async (context, options: SingleOptionsInterface): Promise<TeaserStateItem> =>
    singleAbstract<TeaserStateItem>({ documentType, mutationTypes, storageKey, context, options }),
  list: async (context, options: ListOptionsInterface): Promise<TeaserStateItem> =>
    listAbstract<TeaserStateItem>({ documentType, mutationTypes, storageKey, context, options })
}

export default actions
