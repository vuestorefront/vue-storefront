import { computed, Ref } from '@nuxtjs/composition-api';
import { CustomQuery, Context, FactoryParams, UseMakeOrder, UseMakeOrderErrors, PlatformApi } from '../types';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseMakeOrderFactoryParams<ORDER, API extends PlatformApi = any> extends FactoryParams<API> {
  make: (context: Context, params: { customQuery?: CustomQuery }) => Promise<ORDER>;
}

export const useMakeOrderFactory = <ORDER, API extends PlatformApi = any>(
  factoryParams: UseMakeOrderFactoryParams<ORDER, API>
) => {
  return function useMakeOrder(): UseMakeOrder<ORDER, API> {
    const order: Ref<ORDER> = sharedRef(null, 'useMakeOrder-order');
    const loading: Ref<boolean> = sharedRef(false, 'useMakeOrder-loading');
    const error: Ref<UseMakeOrderErrors> = sharedRef({
      make: null
    }, 'useMakeOrder-error');

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: order, alias: 'currentOrder', loading, error }
    );

    const make = async (params = { customQuery: null }) => {
      Logger.debug('useMakeOrder.make');

      try {
        loading.value = true;
        const createdOrder = await _factoryParams.make(params);
        error.value.make = null;
        order.value = createdOrder;
      } catch (err) {
        error.value.make = err;
        Logger.error('useMakeOrder.make', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      order,
      make,
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
};
