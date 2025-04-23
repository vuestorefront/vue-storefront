import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { STORE_NAME } from './store/store-name';
import { ordersHistoryModule } from './store';

import OrdersHistoryList from './components/orders-history-list.vue';

export const OrdersHistoryModule: StorefrontModule = async function ({ app, store }) {
  store.registerModule(STORE_NAME, ordersHistoryModule);
};

export {
  OrdersHistoryList
}
