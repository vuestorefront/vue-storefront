import { Module } from 'vuex'
import { AmazonPayState } from '../types/AmazonPayState'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'

export const module: Module<AmazonPayState, any> = {
  namespaced: true,
  mutations,
  actions,
  getters
}