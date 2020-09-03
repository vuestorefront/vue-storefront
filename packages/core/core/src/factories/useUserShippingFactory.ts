import { Ref, ComputedRef, computed } from '@vue/composition-api';
import { UseUserShipping } from '../types';
import { sharedRef } from '../utils';

export interface UseUserShippingFactoryParams<ADDRESS> {
  addAddress: (params: {
    address: ADDRESS;
    addresses: ComputedRef<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  deleteAddress: (params: {
    address: ADDRESS;
    addresses: ComputedRef<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  updateAddress: (params: {
    address: ADDRESS;
    addresses: ComputedRef<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  load: () => Promise<ADDRESS[]>;
  setDefault: (params: {
    address: ADDRESS;
    addresses: ComputedRef<ADDRESS[]>;
  }) => Promise<ADDRESS>;
}

export const useUserShippingFactory = <ADDRESS>(
  factoryParams: UseUserShippingFactoryParams<ADDRESS>
) => {

  const useUserShipping = (): UseUserShipping<ADDRESS> => {
    const defaultAddress: Ref<ADDRESS> = sharedRef(null, 'useUserShipping-default-address');
    const loading: Ref<boolean> = sharedRef(false, 'useUserShipping-loading');
    const addresses: Ref<ADDRESS[]> = sharedRef([], 'useUserShipping-addresses');
    const readonlyAddresses: ComputedRef<ADDRESS[]> = computed(() => addresses.value);

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
        addresses.value = await factoryParams.load();
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const setDefault = async (address: ADDRESS) => {
      loading.value = true;
      try {
        await factoryParams.setDefault({
          address,
          addresses: readonlyAddresses
        });
        defaultAddress.value = address;
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

  return { useUserShipping };
};
