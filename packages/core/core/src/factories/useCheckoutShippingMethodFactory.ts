import { UseCheckoutShippingMethod, Context, FactoryParams, UseCheckoutShippingMethodErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';

export interface UseCheckoutShippingMethodParams<SHIPPING_METHOD_OBJECT, SHIPPING_METHOD, SHIPPING_METHOD_PARAMS> extends FactoryParams {
  load: (context: Context) => Promise<SHIPPING_METHOD_OBJECT>;
  save: (context: Context, params: SHIPPING_METHOD_PARAMS) => Promise<SHIPPING_METHOD>;
}

export const useCheckoutShippingMethodFactory = <SHIPPING_METHOD_OBJECT, SHIPPING_METHOD, SHIPPING_METHOD_PARAMS>(
  factoryParams: UseCheckoutShippingMethodParams<SHIPPING_METHOD_OBJECT, SHIPPING_METHOD, SHIPPING_METHOD_PARAMS>
) => {
  return function useCheckoutShippingMethod (): UseCheckoutShippingMethod<SHIPPING_METHOD_OBJECT, SHIPPING_METHOD, SHIPPING_METHOD_PARAMS> {
    const loading: Ref<boolean> = sharedRef(false, 'useCheckoutShippingMethod-loading');
    const shippingMethods: Ref<SHIPPING_METHOD_OBJECT> = sharedRef(null, 'useCheckoutShippingMethod-shippingMethods');
    const selectedShippingMethod: Ref<SHIPPING_METHOD> = sharedRef(null, 'useCheckoutShippingMethod-selectedShippingMethod');
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
        selectedShippingMethod.value = shippingInfo;
      } catch (err) {
        error.value.save = err;
        Logger.error('useCheckoutShippingMethod/save', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      shippingMethods: computed(() => shippingMethods.value),
      selectedShippingMethod: computed(() => selectedShippingMethod.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load,
      save
    };
  };
};
