import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { canOrderItemHaveUpgrades } from './helpers/can-order-item-have-upgrades';
import {
  mapOrderAddressToBaseAddressDetails,
  mapOrderAddressToComparableBaseAddressDetails,
  normalizeBaseAddressDetailsForComparison,
  isOrderAddressConfirmationSubmission
} from './helpers/map-order-address-to-base-address-details';
import { STORE_NAME } from './store/store-name';
import { ordersHistoryModule } from './store';
import { FETCH_ORDERS_HISTORY, FETCH_SUGGESTED_PRODUCTS, REORDER_ITEM, FETCH_ORDER_DETAILS, SUBMIT_TAX_ID_UPDATE_REQUEST, REQUEST_ORDER_SHIPPING_ADDRESS_UPDATE, REQUEST_ORDER_SHIPPING_ADDRESS_CONFIRMATION } from './types/store/actions';
import { useOrderHistoryList } from './composables/use-order-history-list';
import { useOrderDetails } from './composables/use-order-details';
import { GET_SUGGESTED_PRODUCTS_IDS, GET_IS_REORDERING_ITEM } from './types/store/getters';
import { Order } from './types/order';
import { OrderAddress } from './types/order-address';
import { OrderItem } from './types/order-item';

import OrdersHistoryList from './components/orders-history-list.vue';

export const OrdersHistoryModule: StorefrontModule = async function ({ store }) {
  store.registerModule(STORE_NAME, ordersHistoryModule);
};

const FETCH_ORDERS_HISTORY_ACTION = `${STORE_NAME}/${FETCH_ORDERS_HISTORY}`;
const FETCH_SUGGESTED_PRODUCTS_ACTION = `${STORE_NAME}/${FETCH_SUGGESTED_PRODUCTS}`;
const FETCH_ORDER_DETAILS_ACTION = `${STORE_NAME}/${FETCH_ORDER_DETAILS}`;
const SUBMIT_TAX_ID_UPDATE_REQUEST_ACTION = `${STORE_NAME}/${SUBMIT_TAX_ID_UPDATE_REQUEST}`;
const REQUEST_ORDER_SHIPPING_ADDRESS_UPDATE_ACTION = `${STORE_NAME}/${REQUEST_ORDER_SHIPPING_ADDRESS_UPDATE}`;
const REQUEST_ORDER_SHIPPING_ADDRESS_CONFIRMATION_ACTION = `${STORE_NAME}/${REQUEST_ORDER_SHIPPING_ADDRESS_CONFIRMATION}`;

const SUGGESTED_PRODUCTS_IDS_GETTER = `${STORE_NAME}/${GET_SUGGESTED_PRODUCTS_IDS}`;
const REORDER_ITEM_ACTION = `${STORE_NAME}/${REORDER_ITEM}`

const IS_REORDERING_ITEM = `${STORE_NAME}/${GET_IS_REORDERING_ITEM}`;

export {
  OrdersHistoryList,
  FETCH_ORDERS_HISTORY_ACTION,
  FETCH_SUGGESTED_PRODUCTS_ACTION,
  FETCH_ORDER_DETAILS_ACTION,
  SUBMIT_TAX_ID_UPDATE_REQUEST_ACTION,
  REQUEST_ORDER_SHIPPING_ADDRESS_UPDATE_ACTION,
  REQUEST_ORDER_SHIPPING_ADDRESS_CONFIRMATION_ACTION,
  SUGGESTED_PRODUCTS_IDS_GETTER,
  REORDER_ITEM_ACTION,
  IS_REORDERING_ITEM,
  canOrderItemHaveUpgrades,
  mapOrderAddressToBaseAddressDetails,
  mapOrderAddressToComparableBaseAddressDetails,
  normalizeBaseAddressDetailsForComparison,
  isOrderAddressConfirmationSubmission,
  useOrderHistoryList,
  useOrderDetails,
  Order,
  OrderAddress,
  OrderItem
}
