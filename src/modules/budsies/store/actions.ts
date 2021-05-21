import { BudsiesState } from '../types/State'
import { ActionTree } from 'vuex'
import config from 'config'
import RootState from '@vue-storefront/core/types/RootState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { processURLAddress } from '@vue-storefront/core/helpers'

export const actions: ActionTree<BudsiesState, RootState> = {
  async addPrintedProductToCart (
    { commit, state },
    { productId, designOption, uploadedArtworkIds, qty, addons }
  ) {
    const url = processURLAddress(`${config.budsies.endpoint}/printed-products/cart-items`);

    return TaskQueue.execute({
      url,
      payload: {
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ productId, designOption, uploadedArtworkIds, qty, addons })
      },
      silent: true
    });
  }
}
