import { ActionTree } from 'vuex';

import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import RootState from '@vue-storefront/core/types/RootState';

import { FETCH_ORDERS_HISTORY, FETCH_SUGGESTED_PRODUCTS, REORDER_ITEM } from '../types/store/actions';
import { OrdersHistoryState } from '../types/store/state';
import { Order } from '../types/order';
import { SET_ORDERS_HISTORY, SET_SUGGESTED_PRODUCTS, SET_IS_REORDERING_ITEM } from '../types/store/mutations';

export const actions: ActionTree<OrdersHistoryState, RootState> = {
  async [FETCH_ORDERS_HISTORY] ({ commit }): Promise<Order[]> {
    const url = processURLAddress(`${config.budsies.endpoint}/customers/me/orders?token={{token}}`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
      }
    });

    if (resultCode !== 200) {
      throw new Error('Error fetching orders history');
    }

    const orders = result.items || [];

    commit(SET_ORDERS_HISTORY, orders);

    return orders;
  },
  async [FETCH_SUGGESTED_PRODUCTS] ({ commit }, { pageSize }: { pageSize: number }): Promise<string[]> {
    const url = processURLAddress(`${config.budsies.endpoint}/customers/me/suggested-products/active-orders?token={{token}}&page_size=${pageSize}`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
      }
    });

    if (resultCode !== 200) {
      throw new Error('Error fetching suggested products');
    }

    const productIds = result.items || [];

    commit(SET_SUGGESTED_PRODUCTS, productIds);

    return productIds;
  },
  async [REORDER_ITEM] ({ commit, dispatch }, payload: { orderItemId: number }): Promise<void> {
    const url = processURLAddress(`${config.budsies.endpoint}/carts/me/items/add-from-order-requests?token={{token}}`);

    commit(SET_IS_REORDERING_ITEM, true);

    try {
      const { resultCode } = await TaskQueue.execute({
        url,
        payload: {
          method: 'POST',
          mode: 'cors',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        },
        silent: true
      });

      if (resultCode !== 200) {
        throw new Error('Failed to reorder item');
      }
    } finally {
      commit(SET_IS_REORDERING_ITEM, false);
    }

    await dispatch('cart/pullServerCart', true, { root: true });
  }
}
