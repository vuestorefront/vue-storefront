import { Ref, computed } from '@vue/composition-api';
import { CustomQuery, UseUserOrders, Context, FactoryParams } from '../types';
import { sharedRef, Logger, generateContext } from '../utils';

export interface OrdersSearchResult<ORDER> {
  data: ORDER[];
  total: number;
}

export interface UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS> extends FactoryParams {
  searchOrders: (context: Context, params: ORDER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<OrdersSearchResult<ORDER>>;
}

export function useUserOrdersFactory<ORDER, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS>) {
  return function useUserOrders(): UseUserOrders<ORDER, ORDER_SEARCH_PARAMS> {
    const orders: Ref<ORDER[]> = sharedRef([], 'useUserOrders-orders');
    const totalOrders: Ref<number> = sharedRef(0, 'useUserOrders-totalOrders');
    const loading: Ref<boolean> = sharedRef(false, 'useUserOrders-loading');
    const context = generateContext(factoryParams);

    const search = async (searchParams): Promise<void> => {
      Logger.debug('useUserOrders.search', searchParams);

      loading.value = true;
      try {
        const { data, total } = await factoryParams.searchOrders(context, searchParams);
        orders.value = data;
        totalOrders.value = total;
      } catch (err) {
        Logger.error('useUserOrders.search', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    return {
      orders: computed(() => orders.value),
      totalOrders: computed(() => totalOrders.value),
      search,
      loading: computed(() => loading.value)
    };
  };
}
