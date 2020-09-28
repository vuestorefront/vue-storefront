import { Ref, computed } from '@vue/composition-api';
import { CustomQuery, UseUserOrders } from '../types';
import { sharedRef } from '../utils';

export interface OrdersSearchResult<ORDER> {
  data: ORDER[];
  total: number;
}

export type UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS> = {
  searchOrders: (params: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery) => Promise<OrdersSearchResult<ORDER>>;
};

export function useUserOrdersFactory<ORDER, ORDER_SEARCH_PARAMS = any>(
  factoryParams: UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS>
) {
  return function useUserOrders(): UseUserOrders<ORDER> {
    const orders: Ref<ORDER[]> = sharedRef([], 'useUserOrders-orders');
    const totalOrders: Ref<number> = sharedRef(0, 'useUserOrders-totalOrders');
    const loading: Ref<boolean> = sharedRef(false, 'useUserOrders-loading');

    const searchOrders = async (params?: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery): Promise<void> => {
      loading.value = true;
      try {
        const { data, total } = await factoryParams.searchOrders(params, customQuery);
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
