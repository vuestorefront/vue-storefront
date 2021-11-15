import { Module } from 'vuex'

import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state';
import GiftCardState from '../types/GiftCardState';

export const module: Module<GiftCardState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
