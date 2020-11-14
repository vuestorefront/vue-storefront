import { Ref, computed } from '@vue/composition-api';
import { CustomQuery, UseUserOrders, BaseFactoryParams } from '../types';
import { sharedRef, Logger, createFactoryParams } from '../utils';

export interface OrdersSearchResult<ORDER> {
  data: ORDER[];
  total: number;
}

export interface UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS, API> extends BaseFactoryParams<API> {
  searchOrders: (params: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery) => Promise<OrdersSearchResult<ORDER>>;
}

export function useUserOrdersFactory<ORDER, ORDER_SEARCH_PARAMS, API>(rawFactoryParams: UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS, API>) {
  return function useUserOrders(): UseUserOrders<ORDER> {
    const orders: Ref<ORDER[]> = sharedRef([], 'useUserOrders-orders');
    const totalOrders: Ref<number> = sharedRef(0, 'useUserOrders-totalOrders');
    const loading: Ref<boolean> = sharedRef(false, 'useUserOrders-loading');
    const factoryParams = createFactoryParams(rawFactoryParams);

    const searchOrders = async (params?: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery): Promise<void> => {
      Logger.debug('useUserOrders.searchOrders', params);

      loading.value = true;
      try {
        const { data, total } = await factoryParams.searchOrders(params, customQuery);
        orders.value = data;
        totalOrders.value = total;
      } catch (err) {
        Logger.error('useUserOrders.searchOrders', err);
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
