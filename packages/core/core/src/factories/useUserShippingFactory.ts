import { Ref, unref, computed } from '@vue/composition-api';
import { UseUserShipping, Context, FactoryParams, UseUserShippingErrors } from '../types';
import { sharedRef, Logger, mask, configureFactoryParams } from '../utils';

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
    const _factoryParams = configureFactoryParams(factoryParams);
    const readonlyShipping: Readonly<USER_SHIPPING> = unref(shipping);
    const error: Ref<UseUserShippingErrors> = sharedRef({}, 'useUserShipping-error');

    const addAddress = async ({ address }) => {
      Logger.debug('useUserShipping.addAddress', mask(address));

      try {
        loading.value = true;
        error.value.addAddress = null;
        shipping.value = await _factoryParams.addAddress({
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        error.value.addAddress = err;
        Logger.error('useUserShipping/addAddress', err);
      } finally {
        loading.value = false;
      }
    };

    const deleteAddress = async ({ address }) => {
      Logger.debug('useUserShipping.deleteAddress', address);

      try {
        loading.value = true;
        error.value.deleteAddress = null;
        shipping.value = await _factoryParams.deleteAddress({
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        error.value.deleteAddress = err;
        Logger.error('useUserShipping/deleteAddress', err);
      } finally {
        loading.value = false;
      }
    };

    const updateAddress = async ({ address }) => {
      Logger.debug('useUserShipping.updateAddress', address);

      try {
        loading.value = true;
        error.value.updateAddress = null;
        shipping.value = await _factoryParams.updateAddress({
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        error.value.updateAddress = err;
        Logger.error('useUserShipping/updateAddress', err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserShipping.load');

      try {
        loading.value = true;
        error.value.load = null;
        shipping.value = await _factoryParams.load({
          shipping: readonlyShipping
        });
      } catch (err) {
        error.value.load = err;
        Logger.error('useUserShipping/load', err);
      } finally {
        loading.value = false;
      }
    };

    const setDefaultAddress = async ({ address }) => {
      Logger.debug('useUserShipping.setDefaultAddress', address);

      try {
        loading.value = true;
        error.value.setDefaultAddress = null;
        shipping.value = await _factoryParams.setDefaultAddress({
          address,
          shipping: readonlyShipping
        });
      } catch (err) {
        error.value.setDefaultAddress = err;
        Logger.error('useUserShipping/setDefaultAddress', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      shipping: computed(() => shipping.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      addAddress,
      deleteAddress,
      updateAddress,
      load,
      setDefaultAddress
    };
  };

  return useUserShipping;
};
