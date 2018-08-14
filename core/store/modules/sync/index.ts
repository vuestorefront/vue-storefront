import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import RootState from '../../types/RootState'
import SyncState from './types/SyncState'

const sync: Module<SyncState, RootState> = {
  namespaced: true,
  actions,
  mutations
}

export default sync
