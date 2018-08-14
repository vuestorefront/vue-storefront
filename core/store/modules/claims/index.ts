import { Module } from 'vuex'
import actions from './actions'
import RootState from '../../types/RootState'
import ClaimsState from './types/ClaimsState'

const claims: Module<ClaimsState, RootState> = {
  namespaced: true,
  actions
}

export default claims
