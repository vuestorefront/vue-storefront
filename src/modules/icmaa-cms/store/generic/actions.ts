import { ActionTree } from 'vuex'
import { single as singleAbstract, list as listAbstract, MutationTypesInterface, SingleOptionsInterface, ListOptionsInterface } from '../abstract/actions'

import getTypes from './mutation-types'
import GenericState, { GenericStateItem } from '../../types/GenericState'
import RootState from '@vue-storefront/core/types/RootState'

const actions = (stateKey: string, storageKey: string, documentType: string): ActionTree<GenericState, RootState> => {
  const types = getTypes(stateKey)
  const mutationPrefix = stateKey.toUpperCase()
  const mutationTypes: MutationTypesInterface = {
    add: types[`${mutationPrefix}_ADD`],
    upd: types[`${mutationPrefix}_UPD`],
    rmv: types[`${mutationPrefix}_RMV`]
  }

  return {
    single: async (context, options: SingleOptionsInterface): Promise<GenericStateItem> =>
      singleAbstract<GenericStateItem>({ documentType, mutationTypes, stateKey, context, options, identifier: 'uuid' }),
    list: async (context, options: Record<string, any> = {}): Promise<GenericStateItem[]> =>
      listAbstract<GenericStateItem>({ documentType, mutationTypes, stateKey, context, options, identifier: 'uuid' })
  }
}

export default actions
