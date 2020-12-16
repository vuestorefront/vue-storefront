import { Ref, computed } from '@vue/composition-api';
import { CustomQuery, UseUserOrders, Context, FactoryParams } from '../types';
import { sharedRef, Logger, generateContext } from '../utils';

export interface UseUserOrdersFactoryParams<ORDERS, ORDER_SEARCH_PARAMS> extends FactoryParams {
  searchOrders: (context: Context, params: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery) => Promise<ORDERS>;
}

export function useUserOrdersFactory<ORDERS, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrdersFactoryParams<ORDERS, ORDER_SEARCH_PARAMS>) {
  return function useUserOrders(): UseUserOrders<ORDERS> {
    const orders: Ref<ORDERS> = sharedRef([], 'useUserOrders-orders');
    const loading: Ref<boolean> = sharedRef(false, 'useUserOrders-loading');
    const context = generateContext(factoryParams);

    const searchOrders = async (params?: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery): Promise<void> => {
      Logger.debug('useUserOrders.searchOrders', params);

      loading.value = true;
      try {
        orders.value = await factoryParams.searchOrders(context, params, customQuery);
      } catch (err) {
        Logger.error('useUserOrders.searchOrders', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    return {
      orders: computed(() => orders.value),
      searchOrders,
      loading: computed(() => loading.value)
    };
  };
}
