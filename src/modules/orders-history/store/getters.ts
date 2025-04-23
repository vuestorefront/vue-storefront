import { GetterTree } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';

import { OrdersHistoryState } from '../types/store/state';
import { GET_ORDERS_HISTORY } from '../types/store/getters';

export const getters: GetterTree<OrdersHistoryState, RootState> = {
  [GET_ORDERS_HISTORY] (state) {
    return state.orders;
  }
}
