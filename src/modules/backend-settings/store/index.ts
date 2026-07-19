import { Module } from 'vuex';
import BackendSettingsState from '../types/BackendSettingsState';
import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';

const storeModule: Module<BackendSettingsState, any> = {
  namespaced: true,
  state: {
    settings: {}
  },
  mutations,
  actions,
  getters
}

export { storeModule as module }
