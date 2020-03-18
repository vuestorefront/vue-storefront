import { ActionTree } from 'vuex'
import { list as listAbstract, MutationTypesInterface } from 'icmaa-cms/store/abstract/actions'

import { stateKey } from './'
import * as types from './mutation-types'
import SearchAliasState, { SearchAliasStateItem } from '../../types/SearchAliasState'
import RootState from '@vue-storefront/core/types/RootState'

const documentType = 'search-alias'
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_SEARCHALIAS_ADD,
  upd: types.ICMAA_SEARCHALIAS_UPD,
  rmv: types.ICMAA_SEARCHALIAS_RMV
}

const actions: ActionTree<SearchAliasState, RootState> = {
  list: async (context, words: string[]): Promise<SearchAliasStateItem[]> => {
    const options = words.join(',').toLowerCase()

    return listAbstract<SearchAliasStateItem>({
      documentType,
      mutationTypes,
      stateKey,
      context,
      options,
      identifier: 'identifier'
    })
  }
}

export default actions
