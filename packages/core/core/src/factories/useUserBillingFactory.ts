import { Ref, unref, computed } from '@vue/composition-api';
import { UseUserBilling } from '../types';
import { sharedRef } from '../utils';

export interface UseUserBillingFactoryParams<ADDRESS> {
  addAddress: (params: {
    address: Readonly<ADDRESS>;
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  deleteAddress: (params: {
    address: Readonly<ADDRESS>;
    defaultAddress: Readonly<ADDRESS>;
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  updateAddress: (params: {
    address: Readonly<ADDRESS>;
    defaultAddress: Readonly<ADDRESS>;
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  load: (params: {
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  setDefault: (params: {
    address: Readonly<ADDRESS>;
    defaultAddress: Readonly<ADDRESS>;
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS>;
}

export const useUserBillingFactory = <ADDRESS>(
  factoryParams: UseUserBillingFactoryParams<ADDRESS>
) => {

  const useUserBilling = (): UseUserBilling<ADDRESS> => {
    const defaultAddress: Ref<ADDRESS> = sharedRef(null, 'useUserBilling-default-address');
    const loading: Ref<boolean> = sharedRef(false, 'useUserBilling-loading');
    const addresses: Ref<ADDRESS[]> = sharedRef([], 'useUserBilling-addresses');

    const readonlyAddresses: Readonly<ADDRESS[]> = unref(addresses);
    const readonlyDefaultAddress: Readonly<ADDRESS> = unref(defaultAddress);

    const addAddress = async (address: ADDRESS) => {
      loading.value = true;
      try {
        addresses.value = await factoryParams.addAddress({
          address,
          addresses: readonlyAddresses
        });
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const deleteAddress = async (address: ADDRESS) => {
      loading.value = true;
      try {
        addresses.value = await factoryParams.deleteAddress({
          address,
          defaultAddress: readonlyDefaultAddress,
          addresses: readonlyAddresses
        });
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const updateAddress = async (address: ADDRESS) => {
      loading.value = true;
      try {
        addresses.value = await factoryParams.updateAddress({
          address,
          defaultAddress: readonlyDefaultAddress,
          addresses: readonlyAddresses
        });
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      loading.value = true;
      try {
        addresses.value = await factoryParams.load({
          addresses: readonlyAddresses
        });
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const setDefault = async (address: ADDRESS) => {
      loading.value = true;
      try {
        defaultAddress.value = await factoryParams.setDefault({
          address,
          defaultAddress: readonlyDefaultAddress,
          addresses: readonlyAddresses
        });
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      addresses: computed(() => addresses.value),
      totalAddresses: computed(() => addresses.value.length),
      defaultAddress: computed(() => defaultAddress.value),
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
