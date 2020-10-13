import { Ref, unref, computed } from '@vue/composition-api';
import { UseUserBilling } from '../types';
import { sharedRef, Logger } from '../utils';

export interface UseUserBillingFactoryParams<USER_BILLING, USER_BILLING_ITEM> {
  addAddress: (params: {
    address: Readonly<USER_BILLING_ITEM>;
    billing: Readonly<USER_BILLING>;
  }) => Promise<USER_BILLING>;
  deleteAddress: (params: {
    address: Readonly<USER_BILLING_ITEM>;
    billing: Readonly<USER_BILLING>;
  }) => Promise<USER_BILLING>;
  updateAddress: (params: {
    address: Readonly<USER_BILLING_ITEM>;
    billing: Readonly<USER_BILLING>;
  }) => Promise<USER_BILLING>;
  load: (params: {
    billing: Readonly<USER_BILLING>;
  }) => Promise<USER_BILLING>;
  setDefault: (params: {
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

    const readonlyBilling: Readonly<USER_BILLING> = unref(billing);

    const addAddress = async (address: USER_BILLING_ITEM) => {
      Logger.debug('useUserBilling.addAddress', address);

      loading.value = true;
      try {
        billing.value = await factoryParams.addAddress({
          address,
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.addAddress', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const deleteAddress = async (address: USER_BILLING_ITEM) => {
      Logger.debug('useUserBilling.deleteAddress', address);

      loading.value = true;
      try {
        billing.value = await factoryParams.deleteAddress({
          address,
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.deleteAddress', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const updateAddress = async (address: USER_BILLING_ITEM) => {
      Logger.debug('useUserBilling.updateAddress', address);

      loading.value = true;
      try {
        billing.value = await factoryParams.updateAddress({
          address,
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.updateAddress', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserBilling.load');

      loading.value = true;
      try {
        billing.value = await factoryParams.load({
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.load', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const setDefault = async (address: USER_BILLING_ITEM) => {
      Logger.debug('useUserBilling.setDefault');

      loading.value = true;
      try {
        billing.value = await factoryParams.setDefault({
          address,
          billing: readonlyBilling
        });
      } catch (err) {
        Logger.error('useUserBilling.setDefault', err);

        throw new Error(err);
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
