import { ref, onBeforeMount, Ref } from 'vue';

import { Logger } from '@vue-storefront/core/lib/logger';
import { useRootInstance } from 'src/modules/shared';

import { Order } from '../types/order';
import { STORE_NAME } from '../store/store-name';
import { FETCH_ORDER_DETAILS } from '../types/store/actions';

export function useOrderDetails (orderId: string) {
  const root = useRootInstance();
  const order: Ref<Order | null> = ref(null);
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);

  async function loadOrder (): Promise<void> {
    if (isLoading.value || !orderId) {
      return;
    }

    isLoading.value = true;
    isError.value = false;

    try {
      const result = await root.$store.dispatch(`${STORE_NAME}/${FETCH_ORDER_DETAILS}`, { orderId });
      order.value = result;
    } catch (error) {
      isError.value = true;
      Logger.error(`Error loading order: ${error}`, 'order-history')();
    } finally {
      isLoading.value = false;
    }
  }

  onBeforeMount(() => {
    loadOrder();
  });

  return {
    order,
    isLoading,
    isError,
    loadOrder
  };
}
