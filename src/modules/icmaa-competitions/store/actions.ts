import { ActionTree } from 'vuex'
import { single as singleAbstract, list as listAbstract, MutationTypesInterface, SingleOptionsInterface, ListOptionsInterface } from 'icmaa-cms/store/abstract/actions'
import FormService from '../data-resolver/FormService'

import { competitionsStateKey as stateKey } from './'
import * as types from './mutation-types'
import CompetitionsState, { Competition } from '../types/CompetitionsState'
import RootState from '@vue-storefront/core/types/RootState'

import { getCurrentStoreviewDatetime } from 'icmaa-config/helpers/datetime'

const documentType = 'competition'
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_COMPETITIONS_ADD,
  upd: types.ICMAA_COMPETITIONS_UPD,
  rmv: types.ICMAA_COMPETITIONS_RMV
}

const actions: ActionTree<CompetitionsState, RootState> = {
  single: async (context, options: SingleOptionsInterface): Promise<Competition> =>
    singleAbstract<Competition>({ documentType, mutationTypes, stateKey, context, options }),
  list: async (context, options: ListOptionsInterface): Promise<Competition[]> =>
    listAbstract<Competition>({ documentType, mutationTypes, stateKey, context, options }),
  post: async ({ state, dispatch }, { sheetId, data }): Promise<boolean> => {
    data.ip = await dispatch('getIp')
    data.created_at = getCurrentStoreviewDatetime()
    return FormService.sendForm(sheetId, data)
  },
  getIp: async ({ state }): Promise<string|boolean> => {
    const ipService = 'https://api.ipify.org?format=json'
    const headers = { 'Content-Type': 'application/json' }
    const response = await fetch(ipService, { headers })
      .then(resp => resp.json())
      .catch(() => false)

    return response.ip || false
  }
}

export default actions
