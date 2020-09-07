import { Ref, ComputedRef, computed } from '@vue/composition-api';
import { UseUserBilling } from '../types';
import { sharedRef } from '../utils';

export interface UseUserBillingFactoryParams<ADDRESS> {
  addAddress: (params: {
    address: Readonly<ADDRESS>;
    addresses: Readonly<ComputedRef<ADDRESS[]>>;
  }) => Promise<ADDRESS[]>;
  deleteAddress: (params: {
    address: Readonly<ADDRESS>;
    defaultAddress: Readonly<ComputedRef<ADDRESS>>;
    addresses: Readonly<ComputedRef<ADDRESS[]>>;
  }) => Promise<ADDRESS[]>;
  updateAddress: (params: {
    address: Readonly<ADDRESS>;
    defaultAddress: Readonly<ComputedRef<ADDRESS>>;
    addresses: Readonly<ComputedRef<ADDRESS[]>>;
  }) => Promise<ADDRESS[]>;
  load: (params: {
    addresses: Readonly<ComputedRef<ADDRESS[]>>;
  }) => Promise<ADDRESS[]>;
  setDefault: (params: {
    address: Readonly<ADDRESS>;
    defaultAddress: Readonly<ComputedRef<ADDRESS>>;
    addresses: Readonly<ComputedRef<ADDRESS[]>>;
  }) => Promise<ADDRESS>;
}

export const useUserBillingFactory = <ADDRESS>(
  factoryParams: UseUserBillingFactoryParams<ADDRESS>
) => {

  const useUserBilling = (): UseUserBilling<ADDRESS> => {
    const defaultAddress: Ref<ADDRESS> = sharedRef(null, 'useUserBilling-default-address');
    const loading: Ref<boolean> = sharedRef(false, 'useUserBilling-loading');
    const addresses: Ref<ADDRESS[]> = sharedRef([], 'useUserBilling-addresses');

    const readonlyAddresses: ComputedRef<ADDRESS[]> = computed(() => addresses.value);
    const readonlyDefaultAddress: ComputedRef<ADDRESS> = computed(() => defaultAddress.value);

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
      addresses: readonlyAddresses,
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
