import { UseShippingProvider, Context, FactoryParams, UseShippingProviderErrors, CustomQuery } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams, createErrorHandler } from '../utils';

export interface UseShippingProviderParams<STATE, SHIPPING_METHOD> extends FactoryParams {
  load: (context: Context, params: { state: Ref<STATE>, customQuery?: CustomQuery }) => Promise<STATE>;
  save: (context: Context, params: { state: Ref<STATE>, shippingMethod: SHIPPING_METHOD, customQuery?: CustomQuery }) => Promise<STATE>;
}

export const useShippingProviderFactory = <STATE, SHIPPING_METHOD>(
  factoryParams: UseShippingProviderParams<STATE, SHIPPING_METHOD>
) => {
  return function useShippingProvider (): UseShippingProvider<STATE, SHIPPING_METHOD> {
    const loading: Ref<boolean> = sharedRef(false, 'useShippingProvider-loading');
    const state: Ref<STATE> = sharedRef(null, 'useShippingProvider-response');
    const _factoryParams = configureFactoryParams(factoryParams);
    const errorHandler = createErrorHandler<UseShippingProviderErrors>({
      load: null,
      save: null
    }, 'useShippingProvider-error');

    const setState = (newState: STATE) => {
      state.value = newState;
      Logger.debug('useShippingProvider.setState', newState);
    };

    const save = async ({ shippingMethod, customQuery = null }) => {
      Logger.debug('useShippingProvider.save');

      try {
        loading.value = true;
        state.value = await _factoryParams.save({ shippingMethod, customQuery, state });
        errorHandler.clear('save');
      } catch (err) {
        errorHandler.update('save', err);
        Logger.error('useShippingProvider/save', err);
      } finally {
        loading.value = false;
      }
    };

    const load = async ({ customQuery = null } = {}) => {
      Logger.debug('useShippingProvider.load');

      try {
        loading.value = true;
        state.value = await _factoryParams.load({ customQuery, state });
        errorHandler.clear('load');
      } catch (err) {
        errorHandler.update('load', err);
        Logger.error('useShippingProvider/load', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      state,
      loading: computed(() => loading.value),
      error: errorHandler.getAll(),
      load,
      save,
      setState
    };
  };
};
