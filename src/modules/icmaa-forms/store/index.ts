import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import FormsState from '../types/FormsState'

export const formsStateKey = 'icmaaForms'
export const formsStorageKey = 'icmaa-forms'

export const FormsStore: Module<FormsState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}
