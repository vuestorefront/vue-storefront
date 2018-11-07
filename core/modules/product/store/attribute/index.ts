import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/store/types/RootState'
import AttributeState from '../../types/AttributeState'

export const attributeModule: Module<AttributeState, RootState> = {
  namespaced: true,
  state: {
    list_by_code: {},
    list_by_id: {},
    labels: {}
  },
  getters,
  actions,
  mutations
}
