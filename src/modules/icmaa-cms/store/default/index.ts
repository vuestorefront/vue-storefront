import { Module } from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import TaskQueueState from '../../types/TaskQueueState'
import RootState from '@vue-storefront/core/types/RootState'

export const defaultStateKey = 'icmaaCms'

export const DefaultStore: Module<TaskQueueState, RootState> = {
  namespaced: true,
  state: {
    taskQueue: []
  },
  actions,
  getters,
  mutations
}
