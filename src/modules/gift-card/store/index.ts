import { Module } from 'vuex'

import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state';
import GiftCardState from '../types/GiftCardState';

const storeModule: Module<GiftCardState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export { storeModule as module }
