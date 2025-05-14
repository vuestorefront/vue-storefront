import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { STORE_NAME } from './store/store-name';
import { ordersHistoryModule } from './store';
import { FETCH_ORDERS_HISTORY, REORDER_ITEM } from './types/store/actions';
import { GET_IS_REORDERING_ITEM } from './types/store/getters';

import OrdersHistoryList from './components/orders-history-list.vue';

export const OrdersHistoryModule: StorefrontModule = async function ({ app, store }) {
  store.registerModule(STORE_NAME, ordersHistoryModule);
};

const FETCH_ORDERS_HISTORY_ACTION = `${STORE_NAME}/${FETCH_ORDERS_HISTORY}`;
const REORDER_ITEM_ACTION = `${STORE_NAME}/${REORDER_ITEM}`

const IS_REORDERING_ITEM = `${STORE_NAME}/${GET_IS_REORDERING_ITEM}`;

export {
  OrdersHistoryList,
  FETCH_ORDERS_HISTORY_ACTION,
  REORDER_ITEM_ACTION,
  IS_REORDERING_ITEM
}
