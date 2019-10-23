import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import GenericState from '../../types/GenericState'

import merge from 'lodash-es/merge'

const createGenericStore = (stateKey: string, storageKey: string, documentType: string, ExtendStore: Module<GenericState, RootState>): Module<GenericState, RootState> => {
  let GenericStore: Module<GenericState, RootState> = {
    namespaced: true,
    state: {
      items: []
    },
    getters: getters(stateKey),
    actions: actions(stateKey, storageKey, documentType),
    mutations: mutations(stateKey)
  }

  if (ExtendStore) {
    GenericStore = merge(GenericStore, ExtendStore)
  }

  return GenericStore
}

export default createGenericStore
