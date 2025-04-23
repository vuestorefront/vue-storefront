import { MutationTree } from 'vuex';

import { SET_ORDERS_HISTORY } from '../types/store/mutations';
import { OrdersHistoryState } from '../types/store/state';
import { Order } from '../types/order';

export const mutations: MutationTree<OrdersHistoryState> = {
  [SET_ORDERS_HISTORY] (state, orders: Order[]) {
    state.orders = orders;
  }
}
