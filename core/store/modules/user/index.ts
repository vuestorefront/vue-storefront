import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '../../types/RootState'
import UserState from './types/UserState'

const user: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    token: '',
    refreshToken: '',
    groupToken: '',
    groupId: null,
    current: null,
    current_storecode: '',
    session_started: new Date(),
    newsletter: null,
    orders_history: null
  },
  getters,
  actions,
  mutations
}

export default user
