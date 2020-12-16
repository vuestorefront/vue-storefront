import { Ref, unref, computed } from '@vue/composition-api';
import { UseUserShipping, Context, FactoryParams } from '../types';
import { sharedRef, Logger, mask, generateContext } from '../utils';

export interface UseUserShippingFactoryParams<USER_SHIPPING, USER_SHIPPING_ITEM> extends FactoryParams {
  addAddress: (
    context: Context,
    params: {
      address: Readonly<USER_SHIPPING_ITEM>;
      shipping: Readonly<USER_SHIPPING>;
    }) => Promise<USER_SHIPPING>;
  deleteAddress: (
    context: Context,
    params: {
      address: Readonly<USER_SHIPPING_ITEM>;
      shipping: Readonly<USER_SHIPPING>;
    }) => Promise<USER_SHIPPING>;
  updateAddress: (
    context: Context,
    params: {
      address: Readonly<USER_SHIPPING_ITEM>;
      shipping: Readonly<USER_SHIPPING>;
    }) => Promise<USER_SHIPPING>;
  load: (
    context: Context,
    params: {
      shipping: Readonly<USER_SHIPPING>;
    }) => Promise<USER_SHIPPING>;
  setDefaultAddress: (
    context: Context,
    params: {
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
    const context = generateContext(factoryParams);
    const readonlyShipping: Readonly<USER_SHIPPING> = unref(shipping);

    const addAddress = async (address: USER_SHIPPING_ITEM) => {
      Logger.debug('useUserShipping.addAddress', mask(address));

      loading.value = true;
      try {
        shipping.value = await factoryParams.addAddress(context, {
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        Logger.error('useUserShipping.addAddress', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const deleteAddress = async (address: USER_SHIPPING_ITEM) => {
      Logger.debug('useUserShipping.deleteAddress', address);

      loading.value = true;
      try {
        shipping.value = await factoryParams.deleteAddress(context, {
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        Logger.error('useUserShipping.deleteAddress', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const updateAddress = async (address: USER_SHIPPING_ITEM) => {
      Logger.debug('useUserShipping.updateAddress', address);

      loading.value = true;
      try {
        shipping.value = await factoryParams.updateAddress(context, {
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        Logger.error('useUserShipping.updateAddress', address);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserShipping.load');

      loading.value = true;
      try {
        shipping.value = await factoryParams.load(context, {
          shipping: readonlyShipping
        });
      } catch (err) {
        Logger.error('useUserShipping.load', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const setDefaultAddress = async (address: USER_SHIPPING_ITEM) => {
      Logger.debug('useUserShipping.setDefaultAddress', address);

      loading.value = true;
      try {
        shipping.value = await factoryParams.setDefaultAddress(context, {
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        Logger.error('useUserShipping.setDefaultAddress', err);

        throw err;
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
      setDefaultAddress
    };
  };

  return { useUserShipping };
};
