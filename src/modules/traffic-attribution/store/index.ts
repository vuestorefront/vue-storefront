import { Module } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';

import { TrafficAttributionState } from '../types/state.interface';
import { state } from './state';
import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';

export const trafficAttributionStore: Module<TrafficAttributionState, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
