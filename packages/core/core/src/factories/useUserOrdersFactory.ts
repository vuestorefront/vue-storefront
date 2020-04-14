import { ref, Ref, computed } from '@vue/composition-api';
import { UseUserOrders, SearchResult } from '../types';
import { useSSR } from '../../src/utils';

export type UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS> = {
  searchOrders: (params: ORDER_SEARCH_PARAMS) => Promise<SearchResult<ORDER>>;
};

export function useUserOrdersFactory<ORDER, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS>) {
  return function useUserOrders(): UseUserOrders<ORDER> {
    const { initialState, saveToInitialState } = useSSR('vsf-user-orders');
    const orders: Ref<ORDER[]> = ref(initialState?.data || []);
    const totalOrders: Ref<number> = ref(initialState?.total || 0);
    const loading: Ref<boolean> = ref(false);

    const searchOrders = async (params?: ORDER_SEARCH_PARAMS): Promise<void> => {
      loading.value = true;
      try {
        const { data, total } = await factoryParams.searchOrders(params);
        orders.value = data;
        totalOrders.value = total;
        saveToInitialState({ data, total });
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
