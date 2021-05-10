import { UseShipping, Context, FactoryParams, UseShippingErrors, CustomQuery } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseShippingParams<SHIPPING, SHIPPING_PARAMS> extends FactoryParams {
  load: (context: Context, params: { customQuery?: CustomQuery }) => Promise<SHIPPING>;
  save: (context: Context, params: { params: SHIPPING_PARAMS; shippingDetails: SHIPPING; customQuery?: CustomQuery }) => Promise<SHIPPING>;
}

export const useShippingFactory = <SHIPPING, SHIPPING_PARAMS>(
  factoryParams: UseShippingParams<SHIPPING, SHIPPING_PARAMS>
) => {
  return function useShipping (): UseShipping<SHIPPING, SHIPPING_PARAMS> {
    const loading: Ref<boolean> = sharedRef(false, 'useShipping-loading');
    const shipping: Ref<SHIPPING> = sharedRef(null, 'useShipping-shipping');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseShippingErrors> = sharedRef({
      load: null,
      save: null
    }, 'useShipping-error');

    const load = async ({ customQuery = null } = {}) => {
      Logger.debug('useShipping.load');

      try {
        loading.value = true;
        const shippingInfo = await _factoryParams.load({ customQuery });
        error.value.load = null;
        shipping.value = shippingInfo;
      } catch (err) {
        error.value.load = err;
        Logger.error('useShipping/load', err);
      } finally {
        loading.value = false;
      }
    };

    const save = async (saveParams) => {
      Logger.debug('useShipping.save');

      try {
        loading.value = true;
        const shippingInfo = await _factoryParams.save(saveParams);
        error.value.save = null;
        shipping.value = shippingInfo;
      } catch (err) {
        error.value.save = err;
        Logger.error('useShipping/save', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      shipping: computed(() => shipping.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load,
      save
    };
  };
};
