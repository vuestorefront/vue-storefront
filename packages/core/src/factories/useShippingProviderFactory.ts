import {
  UseShippingProvider,
  Context,
  FactoryParams,
  UseShippingProviderErrors,
  CustomQuery,
  PlatformApi
} from '../types';
import { Ref, computed } from '@nuxtjs/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseShippingProviderParams<STATE, SHIPPING_METHOD, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params: { state: Ref<STATE>, customQuery?: CustomQuery }) => Promise<STATE>;
  save: (context: Context, params: { state: Ref<STATE>, shippingMethod: SHIPPING_METHOD, customQuery?: CustomQuery }) => Promise<STATE>;
}

export const useShippingProviderFactory = <STATE, SHIPPING_METHOD, API extends PlatformApi = any>(
  factoryParams: UseShippingProviderParams<STATE, SHIPPING_METHOD, API>
) => {
  return function useShippingProvider (): UseShippingProvider<STATE, SHIPPING_METHOD, API> {
    const loading: Ref<boolean> = sharedRef(false, 'useShippingProvider-loading');
    const state: Ref<STATE> = sharedRef(null, 'useShippingProvider-response');
    const error: Ref<UseShippingProviderErrors> = sharedRef({
      load: null,
      save: null
    }, 'useShippingProvider-error');

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: state, alias: 'currentState', loading, error }
    );

    const setState = (newState: STATE) => {
      state.value = newState;
      Logger.debug('useShippingProvider.setState', newState);
    };

    const save = async ({ shippingMethod, customQuery = null }) => {
      Logger.debug('useShippingProvider.save');

      try {
        loading.value = true;
        state.value = await _factoryParams.save({ shippingMethod, customQuery, state });
        error.value.save = null;
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
        state.value = await _factoryParams.load({ customQuery, state });
        error.value.load = null;
      } catch (err) {
        error.value.load = err;
        Logger.error('useShippingProvider/load', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      state,
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load,
      save,
      setState
    };
  };
};
