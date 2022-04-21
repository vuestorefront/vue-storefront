import { Module } from 'vuex';
import BackendSettingsState from '../types/BackendSettingsState';
import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';

export const module: Module<BackendSettingsState, any> = {
  namespaced: true,
  state: {
    isSynced: false,
    settings: {}
  },
  mutations,
  actions,
  getters
}
