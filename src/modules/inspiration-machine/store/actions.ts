import { ActionTree } from 'vuex';
import config from 'config';

import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import RootState from '@vue-storefront/core/types/RootState';
import Task from '@vue-storefront/core/lib/sync/types/Task';

import { FETCH_EXTRAS, FETCH_THEMES, REQUEST_KIT } from '../types/action';
import { GET_EXTRAS, GET_THEMES } from '../types/getter';
import { SET_EXTRAS, SET_THEMES } from '../types/mutation';
import { SelectableItem } from '../types/selectable-item.interface';
import { StoreState } from '../types/store-state.interface';
import { Theme } from '../types/theme.interface';

const baseInspirationMachineUrl = `${config.budsies.endpoint}/inspirationMachine`;

export const actions: ActionTree<StoreState, RootState> = {
  async [FETCH_EXTRAS] (
    { commit, getters },
    { useCache }: { useCache: boolean } = { useCache: true }
  ): Promise<SelectableItem[]> {
    const extras: SelectableItem[] = getters[GET_EXTRAS];

    if (extras.length && useCache) {
      return extras;
    }

    const url = processURLAddress(`${baseInspirationMachineUrl}/extras`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: {
          'Accept': 'application/json'
        },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    if (resultCode !== 200) {
      throw new Error(`Error while fetching extras`);
    }

    commit(SET_EXTRAS, result);

    return result;
  },
  async [FETCH_THEMES] (
    { commit, getters },
    { useCache }: { useCache: boolean } = { useCache: true }
  ): Promise<Theme[]> {
    const themes: Theme[] = getters[GET_THEMES];

    if (themes.length && useCache) {
      return themes;
    }

    const url = processURLAddress(`${baseInspirationMachineUrl}/themes`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: {
          'Accept': 'application/json'
        },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    if (resultCode !== 200) {
      throw new Error(`Error while fetching themes`);
    }

    commit(SET_THEMES, result);

    return result;
  },
  async [REQUEST_KIT] (
    context,
    payload: {
      email: string,
      characterId: number,
      extrasIds: number[]
    }
  ): Promise<Task> {
    const url = processURLAddress(`${baseInspirationMachineUrl}/kitRequests`);

    const task = await TaskQueue.execute({
      url,
      payload: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(payload)
      },
      silent: false
    });

    if (task.resultCode !== 200) {
      const message = task.result.errorMessage || 'Error during kit requesting';
      throw new Error(message);
    }

    return task;
  }
}
