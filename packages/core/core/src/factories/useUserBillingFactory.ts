import { Ref, unref, computed } from '@vue/composition-api';
import { UseUserBilling, Context, FactoryParams } from '../types';
import { sharedRef, Logger, generateContext } from '../utils';

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
  setDefault: (
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
    const context = generateContext(factoryParams);

    const readonlyBilling: Readonly<USER_BILLING> = unref(billing);

    const addAddress = async (address: USER_BILLING_ITEM) => {
      Logger.debug('useUserBilling.addAddress', address);

      loading.value = true;
      try {
        billing.value = await factoryParams.addAddress(context, {
          address,
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.addAddress', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const deleteAddress = async (address: USER_BILLING_ITEM) => {
      Logger.debug('useUserBilling.deleteAddress', address);

      loading.value = true;
      try {
        billing.value = await factoryParams.deleteAddress(context, {
          address,
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.deleteAddress', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const updateAddress = async (address: USER_BILLING_ITEM) => {
      Logger.debug('useUserBilling.updateAddress', address);

      loading.value = true;
      try {
        billing.value = await factoryParams.updateAddress(context, {
          address,
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.updateAddress', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserBilling.load');

      loading.value = true;
      try {
        billing.value = await factoryParams.load(context, {
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.load', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const setDefault = async (address: USER_BILLING_ITEM) => {
      Logger.debug('useUserBilling.setDefault');

      loading.value = true;
      try {
        billing.value = await factoryParams.setDefault(context, {
          address,
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.setDefault', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    return {
      billing: computed(() => billing.value),
      loading: computed(() => loading.value),
      addAddress,
      deleteAddress,
      updateAddress,
      load,
      setDefault
    };
  };

  return { useUserBilling };
};
