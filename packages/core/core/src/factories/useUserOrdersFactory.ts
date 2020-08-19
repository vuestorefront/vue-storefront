import { Ref, computed } from '@vue/composition-api';
import { UseUserOrders } from '../types';
import { ssrRef } from '../utils';

export interface OrdersSearchResult<ORDER> {
  data: ORDER[];
  total: number;
}

export type UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS> = {
  searchOrders: (params: ORDER_SEARCH_PARAMS) => Promise<OrdersSearchResult<ORDER>>;
};

export function useUserOrdersFactory<ORDER, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS>) {
  return function useUserOrders(): UseUserOrders<ORDER> {
    const orders: Ref<ORDER[]> = ssrRef([]);
    const totalOrders: Ref<number> = ssrRef(0);
    const loading: Ref<boolean> = ssrRef(false);

    const searchOrders = async (params?: ORDER_SEARCH_PARAMS): Promise<void> => {
      loading.value = true;
      try {
        const { data, total } = await factoryParams.searchOrders(params);
        orders.value = data;
        totalOrders.value = total;
      } finally {
        loading.value = false;
      }
    };

    return {
      orders: computed(() => orders.value),
      totalOrders: computed(() => totalOrders.value),
      searchOrders,
      loading: computed(() => loading.value)
    };
  };
}
