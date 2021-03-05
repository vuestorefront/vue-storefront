import { UseShippingProvider, Context, FactoryParams, UseShippingProviderErrors, CustomQuery } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseShippingProviderParams<STATE, SHIPPING_METHOD> extends FactoryParams {
  load: (context: Context, params: { state: Ref<STATE>, customQuery?: CustomQuery }) => Promise<void>;
  save: (context: Context, params: { state: Ref<STATE>, shippingMethod: SHIPPING_METHOD, customQuery?: CustomQuery }) => Promise<void>;
}

export const useShippingProviderFactory = <STATE, SHIPPING_METHOD>(
  factoryParams: UseShippingProviderParams<STATE, SHIPPING_METHOD>,
  initialState: STATE
) => {
  return function useShippingProvider (): UseShippingProvider<STATE, SHIPPING_METHOD> {
    const loading: Ref<boolean> = sharedRef(false, 'useShippingProvider-loading');
    const state: Ref<STATE> = sharedRef(initialState, 'useShippingProvider-response');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseShippingProviderErrors> = sharedRef({}, 'useShippingProvider-error');

    const save = async ({ shippingMethod, customQuery = null }) => {
      Logger.debug('useShippingProvider.save');

      try {
        loading.value = true;
        error.value.save = null;
        await _factoryParams.save({ shippingMethod, customQuery, state });
      } catch (err) {
        error.value.save = err;
        Logger.error('useShippingProvider/save', err);
      } finally {
        loading.value = false;
      }
    };

    const load = async ({ customQuery = null } = {}) => {
      Logger.debug('useShippingProvider.load');

      try {
        loading.value = true;
        error.value.load = null;
        await _factoryParams.load({ customQuery, state });
      } catch (err) {
        error.value.load = err;
        Logger.error('useShippingProvider/load', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      state,
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load,
      save
    };
  };
};
