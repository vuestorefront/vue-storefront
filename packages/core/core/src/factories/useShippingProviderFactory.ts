import { UseShippingProvider, Context, FactoryParams, UseShippingProviderErrors, CustomQuery } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';

export interface UseShippingProviderParams<SHIPPING> extends FactoryParams {
  load: (context: Context, params: { customQuery?: CustomQuery }) => Promise<SHIPPING>;
}

export const useShippingProviderFactory = <SHIPPING>(
  factoryParams: UseShippingProviderParams<SHIPPING>
) => {
  return function useShippingProvider (): UseShippingProvider<SHIPPING> {
    const loading: Ref<boolean> = sharedRef(false, 'useShippingProvider-loading');
    const response: Ref<SHIPPING> = sharedRef(null, 'useShippingProvider-response');
    const context = generateContext(factoryParams);
    const error: Ref<UseShippingProviderErrors> = sharedRef({}, 'useShippingProvider-error');

    const load = async ({ customQuery = null } = {}) => {
      Logger.debug('useShippingProvider.load');

      try {
        loading.value = true;
        error.value.load = null;
        response.value = await factoryParams.load(
          context,
          {
            customQuery
          }
        );
      } catch (err) {
        error.value.load = err;
        Logger.error('useShippingProvider/load', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      response: computed(() => response.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load
    };
  };
};
