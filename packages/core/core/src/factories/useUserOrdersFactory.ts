import { Ref, computed } from '@vue/composition-api';
import { CustomQuery, UseUserOrders, Context, FactoryParams } from '../types';
import { sharedRef, Logger, generateContext } from '../utils';

export interface UseUserOrdersFactoryParams<ORDERS, ORDER_SEARCH_PARAMS> extends FactoryParams {
  searchOrders: (context: Context, params: ORDER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<ORDERS>;
}

export function useUserOrdersFactory<ORDERS, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrdersFactoryParams<ORDERS, ORDER_SEARCH_PARAMS>) {
  return function useUserOrders(): UseUserOrders<ORDERS, ORDER_SEARCH_PARAMS> {
    const orders: Ref<ORDERS> = sharedRef([], 'useUserOrders-orders');
    const loading: Ref<boolean> = sharedRef(false, 'useUserOrders-loading');
    const context = generateContext(factoryParams);

    const search = async (searchParams): Promise<void> => {
      Logger.debug('useUserOrders.search', searchParams);

      loading.value = true;
      try {
        orders.value = await factoryParams.searchOrders(context, searchParams);
      } catch (err) {
        Logger.error('useUserOrders.search', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    return {
      orders: computed(() => orders.value),
      search,
      loading: computed(() => loading.value)
    };
  };
}
