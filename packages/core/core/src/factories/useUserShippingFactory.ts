import { Ref, unref, computed } from '@vue/composition-api';
import { UseUserShipping, Context, FactoryParams, UseUserShippingErrors, CustomQuery } from '../types';
import { sharedRef, Logger, mask, configureFactoryParams, createErrorHandler } from '../utils';

export interface UseUserShippingFactoryParams<USER_SHIPPING, USER_SHIPPING_ITEM> extends FactoryParams {
  addAddress: (
    context: Context,
    params: {
      address: Readonly<USER_SHIPPING_ITEM>;
      shipping: Readonly<USER_SHIPPING>;
      customQuery?: CustomQuery;
    }) => Promise<USER_SHIPPING>;
  deleteAddress: (
    context: Context,
    params: {
      address: Readonly<USER_SHIPPING_ITEM>;
      shipping: Readonly<USER_SHIPPING>;
      customQuery?: CustomQuery;
    }) => Promise<USER_SHIPPING>;
  updateAddress: (
    context: Context,
    params: {
      address: Readonly<USER_SHIPPING_ITEM>;
      shipping: Readonly<USER_SHIPPING>;
      customQuery?: CustomQuery;
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
      customQuery?: CustomQuery;
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
    const errorHandler = createErrorHandler<UseUserShippingErrors>({
      addAddress: null,
      deleteAddress: null,
      updateAddress: null,
      load: null,
      setDefaultAddress: null
    }, 'useUserShipping-error');

    const addAddress = async ({ address, customQuery }) => {
      Logger.debug('useUserShipping.addAddress', mask(address));

      try {
        loading.value = true;
        shipping.value = await _factoryParams.addAddress({
          address,
          shipping: readonlyShipping,
          customQuery
        });
        errorHandler.clear('addAddress');
      } catch (err) {
        errorHandler.update('addAddress', err);
        Logger.error('useUserShipping/addAddress', err);
      } finally {
        loading.value = false;
      }
    };

    const deleteAddress = async ({ address, customQuery }) => {
      Logger.debug('useUserShipping.deleteAddress', address);

      try {
        loading.value = true;
        shipping.value = await _factoryParams.deleteAddress({
          address,
          shipping: readonlyShipping,
          customQuery
        });
        errorHandler.clear('deleteAddress');
      } catch (err) {
        errorHandler.update('deleteAddress', err);
        Logger.error('useUserShipping/deleteAddress', err);
      } finally {
        loading.value = false;
      }
    };

    const updateAddress = async ({ address, customQuery }) => {
      Logger.debug('useUserShipping.updateAddress', address);

      try {
        loading.value = true;
        shipping.value = await _factoryParams.updateAddress({
          address,
          shipping: readonlyShipping,
          customQuery
        });
        errorHandler.clear('updateAddress');
      } catch (err) {
        errorHandler.update('updateAddress', err);
        Logger.error('useUserShipping/updateAddress', err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserShipping.load');

      try {
        loading.value = true;
        shipping.value = await _factoryParams.load({
          shipping: readonlyShipping
        });
        errorHandler.clear('load');
      } catch (err) {
        errorHandler.update('load', err);
        Logger.error('useUserShipping/load', err);
      } finally {
        loading.value = false;
      }
    };

    const setDefaultAddress = async ({ address, customQuery }) => {
      Logger.debug('useUserShipping.setDefaultAddress', address);

      try {
        loading.value = true;
        shipping.value = await _factoryParams.setDefaultAddress({
          address,
          shipping: readonlyShipping,
          customQuery
        });
        errorHandler.clear('setDefaultAddress');
      } catch (err) {
        errorHandler.update('setDefaultAddress', err);
        Logger.error('useUserShipping/setDefaultAddress', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      shipping: computed(() => shipping.value),
      loading: computed(() => loading.value),
      error: errorHandler.getAll(),
      addAddress,
      deleteAddress,
      updateAddress,
      load,
      setDefaultAddress
    };
  };

  return useUserShipping;
};
