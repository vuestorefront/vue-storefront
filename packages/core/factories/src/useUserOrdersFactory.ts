import { ref, Ref, computed } from '@vue/composition-api';
import { UseUserOrders } from '@vue-storefront/interfaces';

export type OrdersSearchResult<ORDER> = {
  data: ORDER[];
  total: number;
};

export type UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS> = {
  searchOrders: (params: ORDER_SEARCH_PARAMS) => Promise<OrdersSearchResult<ORDER>>;
};

export function useUserOrdersFactory<ORDER, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS>) {
  return function useUserOrders(): UseUserOrders<ORDER> {
    const orders: Ref<OrdersSearchResult<ORDER>> = ref({ data: [], total: 0 });
    const loading: Ref<boolean> = ref(false);

    const searchOrders = async (params?: ORDER_SEARCH_PARAMS): Promise<void> => {
      loading.value = true;
      try {
        orders.value = await factoryParams.searchOrders(params);
      } catch (err) {
        console.error(err.graphQLErrors ? err.graphQLErrors[0].message : err);
      }
      loading.value = false;
    };

    return {
      orders: {
        data: computed(() => orders.value.data),
        total: computed(() => orders.value.total)
      },
      searchOrders,
      loading: computed(() => loading.value)
    };
  };
}
