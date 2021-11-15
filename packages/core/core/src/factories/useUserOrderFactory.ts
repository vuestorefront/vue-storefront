import { Ref, computed } from '@nuxtjs/composition-api';
import { CustomQuery, UseUserOrder, Context, FactoryParams, UseUserOrderErrors, PlatformApi } from '../types';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseUserOrderFactoryParams<
  ORDERS,
  ORDER_SEARCH_PARAMS,
  API extends PlatformApi = any
> extends FactoryParams<API> {
  searchOrders: (context: Context, params: ORDER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<ORDERS>;
}

export function useUserOrderFactory<
  ORDERS,
  ORDER_SEARCH_PARAMS,
  API extends PlatformApi = any
>(factoryParams: UseUserOrderFactoryParams<ORDERS, ORDER_SEARCH_PARAMS, API>) {
  return function useUserOrder(): UseUserOrder<ORDERS, ORDER_SEARCH_PARAMS, API> {
    const orders: Ref<ORDERS> = sharedRef({
      results: [],
      total: 0
    }, 'useUserOrder-orders');
    const loading: Ref<boolean> = sharedRef(false, 'useUserOrder-loading');
    const error: Ref<UseUserOrderErrors> = sharedRef({}, 'useUserOrder-error');

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: orders, alias: 'currentOrders', loading, error }
    );

    const search = async (searchParams): Promise<void> => {
      Logger.debug('useUserOrder.search', searchParams);

      try {
        loading.value = true;
        orders.value = await _factoryParams.searchOrders(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error('useUserOrder/search', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      orders: computed(() => orders.value),
      search,
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
