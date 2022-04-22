import { ActionTree } from 'vuex';
import RootState from '@vue-storefront/core/types/RootState';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { processURLAddress } from '@vue-storefront/core/helpers';
import config from 'config';

import BackendSettingsState from '../types/BackendSettingsState';
import { SET_BACKEND_SETTINGS } from '../types/StoreMutations';

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

    return task.result;
  }
}
