import { SetupContext, ref, Ref, onBeforeMount } from '@vue/composition-api';

import { Logger } from '@vue-storefront/core/lib/logger';

import { Order } from '../types/order';
import { STORE_NAME } from '../store/store-name';
import { FETCH_ORDER_DETAILS } from '../types/store/actions';

export function useOrderHistoryOrder ({ root }: SetupContext, orderId: string) {
  const order = ref<Order | undefined>(undefined);
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);

  async function loadOrder (): Promise<void> {
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;
    isError.value = false;

    try {
      const result = await root.$store.dispatch(`${STORE_NAME}/${FETCH_ORDER_DETAILS}`, { orderId });
      (order as Ref<Order | undefined>).value = result;
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
