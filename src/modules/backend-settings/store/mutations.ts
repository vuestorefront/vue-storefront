import { Dictionary } from 'src/modules/budsies';
import Vue from 'vue';
import { MutationTree } from 'vuex';

import BackendSettingsState from '../types/BackendSettingsState';
import * as types from '../types/StoreMutations';

export const mutations: MutationTree<BackendSettingsState> = {
  [types.SET_BACKEND_SETTINGS]: (state, settings: Dictionary<any>) => {
    Vue.set(state, 'settings', settings);
  },
  [types.SET_IS_SYNCED]: (state, isSynced: boolean) => {
    state.isSynced = isSynced;
  }
}
