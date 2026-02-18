import { SetupContext, ref, computed } from '@vue/composition-api';

import { Logger } from '@vue-storefront/core/lib/logger';

import { Order } from '../types/order';
import { STORE_NAME } from '../store/store-name';
import { GET_ORDERS_HISTORY } from '../types/store/getters';
import { FETCH_ORDERS_HISTORY } from '../types/store/actions';

export function useOrderHistoryList ({ root }: SetupContext) {
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);

  const ordersList = computed<Order[]>(() => {
    return root.$store.getters[`${STORE_NAME}/${GET_ORDERS_HISTORY}`];
  });

  const completedOrdersList = computed<Order[]>(() => {
    return ordersList.value.filter((order) => {
      return order.items.every((item) => {
        return item.progress_tracker.completed || item.progress_tracker.cancelled;
      });
    });
  });

  const activeOrdersList = computed<Order[]>(() => {
    return ordersList.value.filter((order) => {
      return order.items.some((item) => {
        return !item.progress_tracker.completed && !item.progress_tracker.cancelled;
      });
    });
  });

  async function loadOrders () {
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;
    isError.value = false;

    try {
      await root.$store.dispatch(`${STORE_NAME}/${FETCH_ORDERS_HISTORY}`, {
        excludeAlterationProducts: true
      });
    } catch (error) {
      isError.value = true;
      Logger.error(`Error loading orders: ${error}`, 'order-history')();
    } finally {
      isLoading.value = false;
    }
  }

  void loadOrders();

  return {
    isLoading,
    isError,
    ordersList,
    completedOrdersList,
    activeOrdersList
  }
}
