import { Ref, unref, computed } from '@vue/composition-api';
import { UseUserShipping } from '../types';
import { sharedRef, Logger, mask } from '../utils';

export interface UseUserShippingFactoryParams<ADDRESS> {
  addAddress: (params: {
    address: Readonly<ADDRESS>;
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  deleteAddress: (params: {
    address: Readonly<ADDRESS>;
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  updateAddress: (params: {
    address: Readonly<ADDRESS>;
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  load: (params: {
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
  setDefault: (params: {
    address: Readonly<ADDRESS>;
    addresses: Readonly<ADDRESS[]>;
  }) => Promise<ADDRESS[]>;
}

export const useUserShippingFactory = <ADDRESS>(
  factoryParams: UseUserShippingFactoryParams<ADDRESS>
) => {

  const useUserShipping = (): UseUserShipping<ADDRESS> => {
    const loading: Ref<boolean> = sharedRef(false, 'useUserShipping-loading');
    const addresses: Ref<ADDRESS[]> = sharedRef([], 'useUserShipping-addresses');

    const readonlyAddresses: Readonly<ADDRESS[]> = unref(addresses);

    const addAddress = async (address: ADDRESS) => {
      Logger.debug('useUserShipping.addAddress', mask(address));

      loading.value = true;
      try {
        addresses.value = await factoryParams.addAddress({
          address,
          addresses: readonlyAddresses
        });
      } catch (err) {
        Logger.error('useUserShipping.addAddress', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const deleteAddress = async (address: ADDRESS) => {
      Logger.debug('useUserShipping.deleteAddress', address);

      loading.value = true;
      try {
        addresses.value = await factoryParams.deleteAddress({
          address,
          addresses: readonlyAddresses
        });
      } catch (err) {
        Logger.error('useUserShipping.deleteAddress', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const updateAddress = async (address: ADDRESS) => {
      Logger.debug('useUserShipping.updateAddress', address);

      loading.value = true;
      try {
        addresses.value = await factoryParams.updateAddress({
          address,
          addresses: readonlyAddresses
        });
      } catch (err) {
        Logger.error('useUserShipping.updateAddress', address);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserShipping.load');

      loading.value = true;
      try {
        addresses.value = await factoryParams.load({
          addresses: readonlyAddresses
        });
      } catch (err) {
        Logger.error('useUserShipping.load', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const setDefault = async (address: ADDRESS) => {
      Logger.debug('useUserShipping.setDefault', address);

      loading.value = true;
      try {
        addresses.value = await factoryParams.setDefault({
          address,
          addresses: readonlyAddresses
        });
      } catch (err) {
        Logger.error('useUserShipping.setDefault', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      addresses: computed(() => addresses.value),
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
