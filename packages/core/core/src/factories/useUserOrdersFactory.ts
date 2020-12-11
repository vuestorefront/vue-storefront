import { Ref, computed } from '@vue/composition-api';
import { markCustomQueryDeprecated } from '../helpers';
import { CustomQuery, UseUserOrders, Context, FactoryParams } from '../types';
import { sharedRef, Logger, generateContext } from '../utils';

export interface OrdersSearchResult<ORDER> {
  data: ORDER[];
  total: number;
}

export interface UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS> extends FactoryParams {
  searchOrders: (context: Context, params: { searchParams: ORDER_SEARCH_PARAMS; customQuery?: CustomQuery }, oldCustomQuery?: CustomQuery) => Promise<OrdersSearchResult<ORDER>>;
}

export function useUserOrdersFactory<ORDER, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS>) {
  return function useUserOrders(): UseUserOrders<ORDER> {
    const orders: Ref<ORDER[]> = sharedRef([], 'useUserOrders-orders');
    const totalOrders: Ref<number> = sharedRef(0, 'useUserOrders-totalOrders');
    const loading: Ref<boolean> = sharedRef(false, 'useUserOrders-loading');
    const context = generateContext(factoryParams);

    const searchOrders = async (searchParams?: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery): Promise<void> => {
      Logger.debug('useUserOrders.searchOrders', searchParams);

      loading.value = true;
      try {
        const { data, total } = await factoryParams.searchOrders(context, { searchParams, customQuery }, markCustomQueryDeprecated(customQuery));
        orders.value = data;
        totalOrders.value = total;
      } catch (err) {
        Logger.error('useUserOrders.searchOrders', err);

        throw err;
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
