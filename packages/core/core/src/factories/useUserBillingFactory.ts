import { Ref, unref, computed } from '@vue/composition-api';
import { UseUserBilling, Context, FactoryParams, UseUserBillingErrors } from '../types';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseUserBillingFactoryParams<USER_BILLING, USER_BILLING_ITEM> extends FactoryParams{
  addAddress: (
    context: Context,
    params: {
      address: Readonly<USER_BILLING_ITEM>;
      billing: Readonly<USER_BILLING>;
    }) => Promise<USER_BILLING>;
  deleteAddress: (
    context: Context,
    params: {
      address: Readonly<USER_BILLING_ITEM>;
      billing: Readonly<USER_BILLING>;
    }) => Promise<USER_BILLING>;
  updateAddress: (
    context: Context,
    params: {
      address: Readonly<USER_BILLING_ITEM>;
      billing: Readonly<USER_BILLING>;
    }) => Promise<USER_BILLING>;
  load: (
    context: Context,
    params: {
      billing: Readonly<USER_BILLING>;
    }) => Promise<USER_BILLING>;
  setDefaultAddress: (
    context: Context,
    params: {
      address: Readonly<USER_BILLING_ITEM>;
      billing: Readonly<USER_BILLING>;
    }) => Promise<USER_BILLING>;
}

export const useUserBillingFactory = <USER_BILLING, USER_BILLING_ITEM>(
  factoryParams: UseUserBillingFactoryParams<USER_BILLING, USER_BILLING_ITEM>
) => {

  const useUserBilling = (): UseUserBilling<USER_BILLING, USER_BILLING_ITEM> => {
    const loading: Ref<boolean> = sharedRef(false, 'useUserBilling-loading');
    const billing: Ref<USER_BILLING> = sharedRef({}, 'useUserBilling-billing');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseUserBillingErrors> = sharedRef({
      addAddress: null,
      deleteAddress: null,
      updateAddress: null,
      load: null,
      setDefaultAddress: null
    }, 'useUserBilling-error');

    const readonlyBilling: Readonly<USER_BILLING> = unref(billing);

    const addAddress = async ({ address }) => {
      Logger.debug('useUserBilling.addAddress', address);

      try {
        loading.value = true;
        billing.value = await _factoryParams.addAddress({
          address,
          billing: readonlyBilling
        });
        error.value.addAddress = null;
      } catch (err) {
        error.value.addAddress = err;
        Logger.error('useUserBilling/addAddress', err);
      } finally {
        loading.value = false;
      }
    };

    const deleteAddress = async ({ address }) => {
      Logger.debug('useUserBilling.deleteAddress', address);

      try {
        loading.value = true;
        billing.value = await _factoryParams.deleteAddress({
          address,
          billing: readonlyBilling
        });
        error.value.deleteAddress = null;
      } catch (err) {
        error.value.deleteAddress = err;
        Logger.error('useUserBilling/deleteAddress', err);
      } finally {
        loading.value = false;
      }
    };

    const updateAddress = async ({ address }) => {
      Logger.debug('useUserBilling.updateAddress', address);

      try {
        loading.value = true;
        billing.value = await _factoryParams.updateAddress({
          address,
          billing: readonlyBilling
        });
        error.value.updateAddress = null;
      } catch (err) {
        error.value.updateAddress = err;
        Logger.error('useUserBilling/updateAddress', err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserBilling.load');

      try {
        loading.value = true;
        billing.value = await _factoryParams.load({
          billing: readonlyBilling
        });
        error.value.load = null;
      } catch (err) {
        error.value.load = err;
        Logger.error('useUserBilling/load', err);
      } finally {
        loading.value = false;
      }
    };

    const setDefaultAddress = async ({ address }) => {
      Logger.debug('useUserBilling.setDefaultAddress');

      try {
        loading.value = true;
        billing.value = await _factoryParams.setDefaultAddress({
          address,
          billing: readonlyBilling
        });
        error.value.setDefaultAddress = null;
      } catch (err) {
        error.value.setDefaultAddress = err;
        Logger.error('useUserBilling/setDefaultAddress', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      billing: computed(() => billing.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      addAddress,
      deleteAddress,
      updateAddress,
      load,
      setDefaultAddress
    };
  };

  return useUserBilling;
};
