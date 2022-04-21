import { ActionTree } from 'vuex';
import RootState from '@vue-storefront/core/types/RootState';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { processURLAddress } from '@vue-storefront/core/helpers';
import config from 'config';

import BackendSettingsState from '../types/BackendSettingsState';
import { SET_BACKEND_SETTINGS, SET_IS_SYNCED } from '../types/StoreMutations';

export const actions: ActionTree<BackendSettingsState, RootState> = {
  async fetchSettings ({ commit }): Promise<void> {
    let url = processURLAddress(`${config.budsies.endpoint}/backend-settings`);

    const task = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    commit(SET_BACKEND_SETTINGS, task.result);
    // commit(SET_BACKEND_SETTINGS, { cart: { productionSpotCountdown: { expirationMinutesCount: 20 } } });

    return task.result;
  },
  async synchronize ({ getters, dispatch, commit }): Promise<any> {
    if (getters['getIsSynced']) {
      return;
    }

    await dispatch('fetchSettings');
    commit(SET_IS_SYNCED, true);
  }
}
