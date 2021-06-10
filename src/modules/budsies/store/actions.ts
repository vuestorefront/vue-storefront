import RootState from '@vue-storefront/core/types/RootState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { processURLAddress } from '@vue-storefront/core/helpers'
import Task from 'core/lib/sync/types/Task'
import { ActionTree } from 'vuex'
import config from 'config'

import { BudsiesState } from '../types/State'
import ObjectBuilderInterface from '../types/object-builder.interface'
import addonFactory from '../factories/addon.factory'
import Addon from '../models/addon.model'
import AddonApiResponse from '../models/addon-api-response.interface'
import isAddonApiResponse from '../models/is-addon-api-response.typeguard'

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
  }
}
