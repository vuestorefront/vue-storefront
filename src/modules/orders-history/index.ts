import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { STORE_NAME } from './store/store-name';
import { ordersHistoryModule } from './store';
import { FETCH_ORDERS_HISTORY, FETCH_SUGGESTED_PRODUCTS, REORDER_ITEM } from './types/store/actions';
import { GET_SUGGESTED_PRODUCTS_IDS } from './types/store/getters';
import { GET_IS_REORDERING_ITEM } from './types/store/getters';

import OrdersHistoryList from './components/orders-history-list.vue';

export const OrdersHistoryModule: StorefrontModule = async function ({ store }) {
  store.registerModule(STORE_NAME, ordersHistoryModule);
};

const FETCH_ORDERS_HISTORY_ACTION = `${STORE_NAME}/${FETCH_ORDERS_HISTORY}`;
const FETCH_SUGGESTED_PRODUCTS_ACTION = `${STORE_NAME}/${FETCH_SUGGESTED_PRODUCTS}`;

const SUGGESTED_PRODUCTS_IDS_GETTER = `${STORE_NAME}/${GET_SUGGESTED_PRODUCTS_IDS}`;
const REORDER_ITEM_ACTION = `${STORE_NAME}/${REORDER_ITEM}`

const IS_REORDERING_ITEM = `${STORE_NAME}/${GET_IS_REORDERING_ITEM}`;

export {
  OrdersHistoryList,
  FETCH_ORDERS_HISTORY_ACTION,
  FETCH_SUGGESTED_PRODUCTS_ACTION,
  SUGGESTED_PRODUCTS_IDS_GETTER,
  REORDER_ITEM_ACTION,
  IS_REORDERING_ITEM
}
