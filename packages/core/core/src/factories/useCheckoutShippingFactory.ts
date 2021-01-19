import { UseCheckoutShipping, Context, FactoryParams, UseCheckoutShippingErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';

export interface UseCheckoutShippingParams<SHIPPING, SHIPPING_PARAMS> extends FactoryParams {
  load: (context: Context) => Promise<SHIPPING>;
  save: (context: Context, params: SHIPPING_PARAMS) => Promise<SHIPPING>;
}

export const useCheckoutShippingFactory = <SHIPPING, SHIPPING_PARAMS>(
  factoryParams: UseCheckoutShippingParams<SHIPPING, SHIPPING_PARAMS>
) => {
  return function useCheckoutShipping (): UseCheckoutShipping<SHIPPING, SHIPPING_PARAMS> {
    const loading: Ref<boolean> = sharedRef(false, 'useCheckoutShipping-loading');
    const shipping: Ref<SHIPPING> = sharedRef(null, 'useCheckoutShipping-shipping');
    const context = generateContext(factoryParams);
    const error: Ref<UseCheckoutShippingErrors> = sharedRef({}, 'useCheckoutShipping-error');

    const load = async () => {
      Logger.debug('useCheckoutShipping.load');

      try {
        loading.value = true;
        error.value.load = null;
        const shippingInfo = await factoryParams.load(
          context
        );
        shipping.value = shippingInfo;
      } catch (err) {
        error.value.load = err;
        Logger.error('useCheckoutShipping/load', err);
      } finally {
        loading.value = false;
      }
    };

    const save = async ({ params, shippingDetails }: { params: SHIPPING_PARAMS; shippingDetails: any }) => {
      Logger.debug('useCheckoutShipping.save');

      try {
        loading.value = true;
        error.value.save = null;
        const shippingInfo = await factoryParams.save(
          context,
          {
            ...params,
            shippingDetails
          }
        );
        shipping.value = shippingInfo;
      } catch (err) {
        error.value.save = err;
        Logger.error('useCheckoutShipping/save', err);
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
