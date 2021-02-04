import { UseShippingMethod, Context, FactoryParams, UseShippingMethodErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';

export interface UseShippingMethodParams<SHIPPING_METHOD_OBJECT, SHIPPING_METHOD, SHIPPING_METHOD_PARAMS> extends FactoryParams {
  load: (context: Context) => Promise<SHIPPING_METHOD_OBJECT>;
  save: (context: Context, params: SHIPPING_METHOD_PARAMS) => Promise<SHIPPING_METHOD>;
}

export const useShippingMethodFactory = <SHIPPING_METHOD_OBJECT, SHIPPING_METHOD, SHIPPING_METHOD_PARAMS>(
  factoryParams: UseShippingMethodParams<SHIPPING_METHOD_OBJECT, SHIPPING_METHOD, SHIPPING_METHOD_PARAMS>
) => {
  return function useShippingMethod (): UseShippingMethod<SHIPPING_METHOD_OBJECT, SHIPPING_METHOD_PARAMS> {
    const loading: Ref<boolean> = sharedRef(false, 'useShippingMethod-loading');
    const shippingMethods: Ref<SHIPPING_METHOD_OBJECT> = sharedRef(null, 'useShippingMethod-shippingMethods');
    const context = generateContext(factoryParams);
    const error: Ref<UseShippingMethodErrors> = sharedRef({}, 'useShippingMethod-error');

    const load = async () => {
      Logger.debug('useShippingMethod.load');

      try {
        loading.value = true;
        error.value.load = null;
        const shippingInfo = await factoryParams.load(
          context
        );
        shippingMethods.value = shippingInfo;
      } catch (err) {
        error.value.load = err;
        Logger.error('useShippingMethod/load', err);
      } finally {
        loading.value = false;
      }
    };

    const save = async (params: SHIPPING_METHOD_PARAMS) => {
      Logger.debug('useShippingMethod.save');

      try {
        loading.value = true;
        error.value.save = null;
        const shippingInfo = await factoryParams.save(
          context,
          params
        );
        console.log(shippingInfo, 'what to do with this shippingInfo? ShippingMethodFactory.save');
      } catch (err) {
        error.value.save = err;
        Logger.error('useShippingMethod/save', err);
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
