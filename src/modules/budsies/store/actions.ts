import RootState from '@vue-storefront/core/types/RootState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { ActionTree } from 'vuex'
import config from 'config'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { BudsiesState } from '../types/State'
import * as types from './mutation-types'
import ObjectBuilderInterface from '../types/object-builder.interface'
import addonFactory from '../factories/addon.factory'
import Addon from '../models/addon.model'
import AddonApiResponse from '../models/addon-api-response.interface'
import isAddonApiResponse from '../models/is-addon-api-response.typeguard'
import { Logger } from '@vue-storefront/core/lib/logger'

function parse<T, R> (
  items: unknown[],
  objectBuilder: ObjectBuilderInterface<T, R>,
  typeGuard: (arg: unknown) => arg is R
): T[] {
  const values: T[] = [];

  items.forEach((item) => {
    if (!typeGuard(item)) {
      console.error(item);
      throw new Error('Unexpected response!');
    }

    const value = objectBuilder(item);

    values.push(value);
  });

  return values;
}

export const actions: ActionTree<BudsiesState, RootState> = {
  async loadPrintedProductAddons (
    { commit, state },
    { productId }
  ): Promise<void> {
    const url = processURLAddress(`${config.budsies.endpoint}/printed-products/extra-photos-addons`);

    const result = await TaskQueue.execute({
      url: `${url}?productId=${productId}`,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    const addons = parse<Addon, AddonApiResponse>(result.result, addonFactory, isAddonApiResponse);

    commit('setPrintedProductAddons', { key: productId, addons: addons });
  },
  async createNewPlushie (
    { commit, state },
    { productId }
  ): Promise<string> {
    const url = processURLAddress(`${config.budsies.endpoint}/plushies`);

    const result = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ productId })
      },
      silent: true
    });

    const id = result.result;

    commit(types.CURRENT_PLUSHIE_ID_SET, { id });

    return id;
  },
  async synchronize ({ commit }) {
    const budsiesStorage = StorageManager.get(types.SN_BUDSIES);
    const currentPlushieId = await budsiesStorage.getItem('current-plushie-id');

    if (currentPlushieId) {
      commit(types.CURRENT_PLUSHIE_ID_SET, { id: currentPlushieId })
      Logger.info('Current Plushie ID received from cache.', 'cache', currentPlushieId)()
    }
  }
}
