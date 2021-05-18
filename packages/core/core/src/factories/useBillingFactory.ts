import { UseBilling, Context, FactoryParams, UseBillingErrors, CustomQuery } from '../types';
import { Ref, UnwrapRef, computed, reactive } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseBillingParams<BILLING, BILLING_PARAMS> extends FactoryParams {
  load: (context: Context, params: { customQuery?: CustomQuery }) => Promise<BILLING>;
  save: (context: Context, params: { params: BILLING_PARAMS; billingDetails: BILLING; customQuery?: CustomQuery }) => Promise<BILLING>;
}

export const useBillingFactory = <BILLING, BILLING_PARAMS>(
  factoryParams: UseBillingParams<BILLING, BILLING_PARAMS>
) => {
  return function useBilling (): UseBilling<BILLING, BILLING_PARAMS> {
    const loading: Ref<boolean> = sharedRef(false, 'useBilling-loading');
    const billing: Ref<BILLING> = sharedRef(null, 'useBilling-billing');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: UnwrapRef<UseBillingErrors> = reactive({
      load: null,
      save: null
    });

    const load = async ({ customQuery = null } = {}) => {
      Logger.debug('useBilling.load');

      try {
        loading.value = true;
        const billingInfo = await _factoryParams.load({ customQuery });
        error.load = null;
        billing.value = billingInfo;
      } catch (err) {
        error.load = err;
        Logger.error('useBilling/load', err);
      } finally {
        loading.value = false;
      }
    };

    const save = async (saveParams) => {
      Logger.debug('useBilling.save');

      try {
        loading.value = true;
        const billingInfo = await _factoryParams.save(saveParams);
        error.save = null;
        billing.value = billingInfo;
      } catch (err) {
        error.save = err;
        Logger.error('useBilling/save', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      billing: computed(() => billing.value),
      loading: computed(() => loading.value),
      error: computed(() => error),
      load,
      save
    };
  };
};
