import { UseBilling, Context, FactoryParams, UseBillingErrors, CustomQuery } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';

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
    const context = generateContext(factoryParams);
    const error: Ref<UseBillingErrors> = sharedRef({}, 'useBilling-error');

    const load = async ({ customQuery = null } = {}) => {
      Logger.debug('useBilling.load');

      try {
        loading.value = true;
        error.value.load = null;
        const billingInfo = await factoryParams.load(
          context,
          {
            customQuery
          }
        );
        billing.value = billingInfo;
      } catch (err) {
        error.value.load = err;
        Logger.error('useBilling/load', err);
      } finally {
        loading.value = false;
      }
    };

    const save = async (saveParams) => {
      Logger.debug('useBilling.save');

      try {
        loading.value = true;
        error.value.save = null;
        const billingInfo = await factoryParams.save(
          context,
          saveParams
        );
        billing.value = billingInfo;
      } catch (err) {
        error.value.save = err;
        Logger.error('useBilling/save', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      billing: computed(() => billing.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load,
      save
    };
  };
};
