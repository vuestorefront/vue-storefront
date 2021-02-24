import { Ref, computed } from '@vue/composition-api';
import { CustomQuery, UseUserOrders, Context, FactoryParams, UseUserOrdersErrors } from '../types';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseUserOrdersFactoryParams<ORDERS, ORDER_SEARCH_PARAMS> extends FactoryParams {
  searchOrders: (context: Context, params: ORDER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<ORDERS>;
}

export function useUserOrdersFactory<ORDERS, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrdersFactoryParams<ORDERS, ORDER_SEARCH_PARAMS>) {
  return function useUserOrders(): UseUserOrders<ORDERS, ORDER_SEARCH_PARAMS> {
    const orders: Ref<ORDERS> = sharedRef([], 'useUserOrders-orders');
    const loading: Ref<boolean> = sharedRef(false, 'useUserOrders-loading');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseUserOrdersErrors> = sharedRef({}, 'useUserOrders-error');

    const search = async (searchParams): Promise<void> => {
      Logger.debug('useUserOrders.search', searchParams);

      try {
        loading.value = true;
        error.value.search = null;
        orders.value = await _factoryParams.searchOrders(searchParams);
      } catch (err) {
        error.value.search = err;
        Logger.error('useUserOrders/search', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      orders: computed(() => orders.value),
      search,
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
