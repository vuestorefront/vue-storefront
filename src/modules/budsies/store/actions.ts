import RootState from '@vue-storefront/core/types/RootState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { processURLAddress } from '@vue-storefront/core/helpers'
import Task from 'core/lib/sync/types/Task'
import { ActionTree } from 'vuex'
import config from 'config'
import { BudsiesState } from '../types/State'
import ObjectBuilderInterface from '../types/object-builder.interface'
import { Value } from '../types/value.interface'
import { ValueCollection } from '../types/value.collection'
import AddonFactory from '../factories/addon.factory'

const parse = (
  items: any[],
  objectBuilder: ObjectBuilderInterface<Value>
): ValueCollection<Value> => {
  const values: Value[] = [];

  items.forEach((item: any) => {
    const value = objectBuilder.buildFromJSON(item);

    values.push(value);
  });

  return new ValueCollection<Value>(values);
}

export const actions: ActionTree<BudsiesState, RootState> = {
  async addPrintedProductToCart (
    { commit, state },
    { productId, designOption, uploadedArtworkIds, qty, addons }
  ): Promise<Task> {
    const url = processURLAddress(`${config.budsies.endpoint}/printed-products/cart-items?token={{token}}&cartId={{cartId}}`);

    return TaskQueue.execute({
      url,
      payload: {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ productId, designOption, uploadedArtworkIds, qty, addons })
      },
      silent: true
    });
  },
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

    const addonFactory = new AddonFactory();

    const addons = parse(result.result, addonFactory);

    commit('setPrintedProductAddons', { key: productId, addons: addons.getItems() });
  }
}
