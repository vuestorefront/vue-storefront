import { ActionTree } from 'vuex'
import { list as listAbstract, MutationTypesInterface, ListOptionsInterface } from 'icmaa-cms/store/abstract/actions'

import { teaserStorageKey as storageKey } from './'
import * as types from './mutation-types'
import TeaserState, { TeaserStateItem } from '../types/TeaserState'
import RootState from '@vue-storefront/core/types/RootState'

import { getCurrentStoreviewDatetime } from '../helper/date'

const documentType = 'teaser'
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_TEASER_ADD,
  upd: types.ICMAA_TEASER_UPD,
  rmv: types.ICMAA_TEASER_RMV
}

const actions: ActionTree<TeaserState, RootState> = {
  list: async (context, tags: string): Promise<TeaserStateItem[]> => {
    const options = {
      active: { 'in': true },
      tag: { 'in_array': tags },
      show_from: { 'lt-date': getCurrentStoreviewDatetime() },
      show_to: { 'gt-date': getCurrentStoreviewDatetime() }
    }

    return listAbstract<TeaserStateItem>({ documentType, mutationTypes, storageKey, context, options, identifier: 'uuid' })
  }
}

export default actions
