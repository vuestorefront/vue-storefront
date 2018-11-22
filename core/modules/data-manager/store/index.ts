import { Module } from 'vuex'
import actions from './actions'
import RootState from '@vue-storefront/store/types/RootState'
import DataManagerState from '../types/DataManagerState'

export const module:Module<DataManagerState, RootState> = {
  namespaced: true,
  state: {
    fetchOperations: []
  },
  actions
}
