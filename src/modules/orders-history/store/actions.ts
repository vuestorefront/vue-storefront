import { ActionTree } from 'vuex';

import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import RootState from '@vue-storefront/core/types/RootState';

import { FETCH_ORDERS_HISTORY } from '../types/store/actions';
import { OrdersHistoryState } from '../types/store/state';
import { Order } from '../types/order';
import { SET_ORDERS_HISTORY } from '../types/store/mutations';

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
  }
}
