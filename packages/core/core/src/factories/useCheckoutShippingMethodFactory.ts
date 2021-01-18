import { UseCheckoutShippingMethod, Context, FactoryParams, UseCheckoutShippingMethodErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';

export interface UseCheckoutShippingMethodParams<SHIPPING_METHODS, SHIPPING_METHOD_PARAMS> extends FactoryParams {
  load: (context: Context) => Promise<SHIPPING_METHODS>;
  save: (context: Context, params: SHIPPING_METHOD_PARAMS) => Promise<SHIPPING_METHODS>;
}

export const useCheckoutShippingMethodFactory = <SHIPPING_METHODS, SHIPPING_METHOD_PARAMS>(
  factoryParams: UseCheckoutShippingMethodParams<SHIPPING_METHODS, SHIPPING_METHOD_PARAMS>
) => {
  return function useCheckoutShippingMethod (): UseCheckoutShippingMethod<SHIPPING_METHODS, SHIPPING_METHOD_PARAMS> {
    const loading: Ref<boolean> = sharedRef(false, 'useCheckoutShippingMethod-loading');
    const shippingMethods: Ref<SHIPPING_METHODS> = sharedRef(null, 'useCheckoutShippingMethod-shipping');
    const context = generateContext(factoryParams);
    const error: Ref<UseCheckoutShippingMethodErrors> = sharedRef({}, 'useCheckoutShippingMethod-error');

    const load = async () => {
      Logger.debug('useCheckoutShippingMethod.load');

      try {
        loading.value = true;
        error.value.load = null;
        const shippingInfo = await factoryParams.load(
          context
        );
        shippingMethods.value = shippingInfo;
      } catch (err) {
        error.value.load = err;
        Logger.error('useCheckoutShippingMethod/load', err);
      } finally {
        loading.value = false;
      }
    };

    const save = async (params: SHIPPING_METHOD_PARAMS) => {
      Logger.debug('useCheckoutShippingMethod.save');

      try {
        loading.value = true;
        error.value.save = null;
        const shippingInfo = await factoryParams.save(
          context,
          params
        );
        shippingMethods.value = shippingInfo;
      } catch (err) {
        error.value.save = err;
        Logger.error('useCheckoutShippingMethod/save', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      shippingMethods: computed(() => shippingMethods.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load,
      save
    };
  };
};
