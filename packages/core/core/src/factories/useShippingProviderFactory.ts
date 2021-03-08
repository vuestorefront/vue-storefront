import { UseShippingProvider, Context, FactoryParams, UseShippingProviderErrors, CustomQuery } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseShippingProviderParams<SHIPPING, SHIPPING_METHOD> extends FactoryParams {
  load: (context: Context, params: { customQuery?: CustomQuery }) => Promise<SHIPPING>;
  save: (context: Context, params: { shippingMethod: SHIPPING_METHOD, customQuery?: CustomQuery }) => Promise<SHIPPING>;
}

export const useShippingProviderFactory = <SHIPPING, SHIPPING_METHOD>(
  factoryParams: UseShippingProviderParams<SHIPPING, SHIPPING_METHOD>
) => {
  return function useShippingProvider (): UseShippingProvider<SHIPPING, SHIPPING_METHOD> {
    const loading: Ref<boolean> = sharedRef(false, 'useShippingProvider-loading');
    const response: Ref<SHIPPING> = sharedRef(null, 'useShippingProvider-response');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseShippingProviderErrors> = sharedRef({}, 'useShippingProvider-error');

    const save = async ({ shippingMethod, customQuery = null }) => {
      Logger.debug('useShippingProvider.save');

      try {
        loading.value = true;
        error.value.save = null;
        response.value = await _factoryParams.save({ shippingMethod, customQuery });
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
        response.value = await _factoryParams.load({ customQuery });
      } catch (err) {
        error.value.load = err;
        Logger.error('useShippingProvider/load', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      response,
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load,
      save
    };
  };
};
