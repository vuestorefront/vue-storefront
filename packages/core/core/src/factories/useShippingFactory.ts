import { UseShipping, Context, FactoryParams, UseShippingErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';

export interface UseShippingParams<SHIPPING, SHIPPING_PARAMS> extends FactoryParams {
  load: (context: Context) => Promise<SHIPPING>;
  save: (context: Context, params: { params: SHIPPING_PARAMS; shippingDetails: SHIPPING }) => Promise<SHIPPING>;
}

export const useShippingFactory = <SHIPPING, SHIPPING_PARAMS>(
  factoryParams: UseShippingParams<SHIPPING, SHIPPING_PARAMS>
) => {
  return function useShipping (): UseShipping<SHIPPING, SHIPPING_PARAMS> {
    const loading: Ref<boolean> = sharedRef(false, 'useShipping-loading');
    const shipping: Ref<SHIPPING> = sharedRef(null, 'useShipping-shipping');
    const context = generateContext(factoryParams);
    const error: Ref<UseShippingErrors> = sharedRef({}, 'useShipping-error');

    const load = async () => {
      Logger.debug('useShipping.load');

      try {
        loading.value = true;
        error.value.load = null;
        const shippingInfo = await factoryParams.load(
          context
        );
        shipping.value = shippingInfo;
      } catch (err) {
        error.value.load = err;
        Logger.error('useShipping/load', err);
      } finally {
        loading.value = false;
      }
    };

    const save = async ({ params, shippingDetails }: { params: SHIPPING_PARAMS; shippingDetails: SHIPPING }) => {
      Logger.debug('useShipping.save');

      try {
        loading.value = true;
        error.value.save = null;
        const shippingInfo = await factoryParams.save(
          context,
          {
            params,
            shippingDetails
          }
        );
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
