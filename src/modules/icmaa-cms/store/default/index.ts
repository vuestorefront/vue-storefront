import { Module } from 'vuex'

import actions from './actions'
import RootState from '@vue-storefront/core/types/RootState'

export const defaultStateKey = 'icmaaCms'

export const DefaultStore: Module<{}, RootState> = {
  namespaced: true,
  actions
}
