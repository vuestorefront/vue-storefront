import { Ref, unref, computed } from '@vue/composition-api';
import { UseUserShipping } from '../types';
import { sharedRef, Logger, mask } from '../utils';

export interface UseUserShippingFactoryParams<USER_SHIPPING, USER_SHIPPING_ITEM> {
  addAddress: (params: {
    address: Readonly<USER_SHIPPING_ITEM>;
    shipping: Readonly<USER_SHIPPING>;
  }) => Promise<USER_SHIPPING>;
  deleteAddress: (params: {
    address: Readonly<USER_SHIPPING_ITEM>;
    shipping: Readonly<USER_SHIPPING>;
  }) => Promise<USER_SHIPPING>;
  updateAddress: (params: {
    address: Readonly<USER_SHIPPING_ITEM>;
    shipping: Readonly<USER_SHIPPING>;
  }) => Promise<USER_SHIPPING>;
  load: (params: {
    shipping: Readonly<USER_SHIPPING>;
  }) => Promise<USER_SHIPPING>;
  setDefault: (params: {
    address: Readonly<USER_SHIPPING_ITEM>;
    shipping: Readonly<USER_SHIPPING>;
  }) => Promise<USER_SHIPPING>;
}

export const useUserShippingFactory = <USER_SHIPPING, USER_SHIPPING_ITEM>(
  factoryParams: UseUserShippingFactoryParams<USER_SHIPPING, USER_SHIPPING_ITEM>
) => {

  const useUserShipping = (): UseUserShipping<USER_SHIPPING, USER_SHIPPING_ITEM> => {
    const loading: Ref<boolean> = sharedRef(false, 'useUserShipping-loading');
    const shipping: Ref<USER_SHIPPING> = sharedRef({}, 'useUserShipping-shipping');

    const readonlyShipping: Readonly<USER_SHIPPING> = unref(shipping);

    const addAddress = async (address: USER_SHIPPING_ITEM) => {
      Logger.debug('useUserShipping.addAddress', mask(address));

      loading.value = true;
      try {
        shipping.value = await factoryParams.addAddress({
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        Logger.error('useUserShipping.addAddress', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const deleteAddress = async (address: USER_SHIPPING_ITEM) => {
      Logger.debug('useUserShipping.deleteAddress', address);

      loading.value = true;
      try {
        shipping.value = await factoryParams.deleteAddress({
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        Logger.error('useUserShipping.deleteAddress', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const updateAddress = async (address: USER_SHIPPING_ITEM) => {
      Logger.debug('useUserShipping.updateAddress', address);

      loading.value = true;
      try {
        shipping.value = await factoryParams.updateAddress({
          address,
          shipping: readonlyShipping
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
        shipping.value = await factoryParams.load({
          shipping: readonlyShipping
        });
      } catch (err) {
        Logger.error('useUserShipping.load', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const setDefault = async (address: USER_SHIPPING_ITEM) => {
      Logger.debug('useUserShipping.setDefault', address);

      loading.value = true;
      try {
        shipping.value = await factoryParams.setDefault({
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        Logger.error('useUserShipping.setDefault', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      shipping: computed(() => shipping.value),
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
