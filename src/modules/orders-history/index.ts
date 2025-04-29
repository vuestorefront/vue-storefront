import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { STORE_NAME } from './store/store-name';
import { ordersHistoryModule } from './store';
import { FETCH_ORDERS_HISTORY } from './types/store/actions';

import OrdersHistoryList from './components/orders-history-list.vue';

export const OrdersHistoryModule: StorefrontModule = async function ({ app, store }) {
  store.registerModule(STORE_NAME, ordersHistoryModule);
};

const FETCH_ORDERS_HISTORY_ACTION = `${STORE_NAME}/${FETCH_ORDERS_HISTORY}`;

export {
  OrdersHistoryList,
  FETCH_ORDERS_HISTORY_ACTION
}
