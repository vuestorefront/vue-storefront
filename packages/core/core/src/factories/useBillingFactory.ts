import { UseBilling, Context, FactoryParams, UseBillingErrors, CustomQuery, PlatformApi } from '../types';
import { Ref, computed } from '@nuxtjs/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseBillingParams<BILLING, BILLING_PARAMS, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params: { customQuery?: CustomQuery }) => Promise<BILLING>;
  save: (context: Context, params: { params: BILLING_PARAMS; billingDetails: BILLING; customQuery?: CustomQuery }) => Promise<BILLING>;
}

export const useBillingFactory = <BILLING, BILLING_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseBillingParams<BILLING, BILLING_PARAMS, API>
) => {
  return function useBilling (): UseBilling<BILLING, BILLING_PARAMS, API> {
    const loading: Ref<boolean> = sharedRef(false, 'useBilling-loading');
    const billing: Ref<BILLING> = sharedRef(null, 'useBilling-billing');
    const error: Ref<UseBillingErrors> = sharedRef({
      load: null,
      save: null
    }, 'useBilling-error');

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: billing, alias: 'currentBilling', loading, error }
    );

    const load = async ({ customQuery = null } = {}) => {
      Logger.debug('useBilling.load');

      try {
        loading.value = true;
        const billingInfo = await _factoryParams.load({ customQuery });
        error.value.load = null;
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
        const billingInfo = await _factoryParams.save(saveParams);
        error.value.save = null;
        billing.value = billingInfo;
      } catch (err) {
        error.value.save = err;
        Logger.error('useBilling/save', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      billing: computed(() => billing.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load,
      save
    };
  };
};
